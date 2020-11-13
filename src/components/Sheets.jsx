import React, { Component } from "react";
import formatNum from "./functions/format-number";
import returnRows from "./functions/return-rows";
import { Container, Nav } from "./styled-components";
import Dropdown from "react-dropdown";

const apiKey = process.env.REACT_APP_SHEETS_KEY;

const sheetID = process.env.REACT_APP_SHEETS_ID;

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${apiKey}`;

    class Sheets extends Component {
        constructor() {
          super();
          this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            amRevenue: null,
            ebRevenue: null,
            etRevenue: null,
            totalRevenue: null,
            productViews: null,
            purchaseRate: " ",
            checkoutRate: " ",
            abandonedRate: " ",
            ordersTrendStore: []
          };
        }

        getData = arg => {
            // google sheets data
            const arr = this.state.items;
            const arrLen = arr.length;
        
            // kpi's
            // amazon revenue
            let amRevenue = 0;
            //ebay revenue
            let ebRevenue = 0;
            // etsy revenue
            let etRevenue = 0;
            // total revenue
            let totalRevenue = 0;
            // product views
            let productViews = 0;
            // purchase rate
            let purchaseRate = 0;
            // checkout rate
            let checkoutRate = 0;
            // abandoned rate
            let abandonedRate = 0;
            // order trend by brand
            let ordersTrendStore = [];
            // order trend by region
            let ordersTrendRegion = [];
            let orderesTrendnw = 0;
            let orderesTrendsw = 0;
            let orderesTrendc = 0;
            let orderesTrendne = 0;
            let orderesTrendse = 0;
        
            let selectedValue = null;
        
            for (let i = 0; i < arrLen; i++) {
              if (arg === arr[i]["month"]) {
                if (arr[i]["source"] === "AM") {
                  amRevenue += parseInt(arr[i].revenue);
                  ordersTrendStore.push(this.assignValues("Amazon", arr[i].orders));
                } else if (arr[i]["source"] === "EB") {
                  ebRevenue += parseInt(arr[i].revenue);
                  ordersTrendStore.push(this.assignValues("Ebay", arr[i].orders));
                } else if (arr[i]["source"] === "ET") {
                  etRevenue += parseInt(arr[i].revenue);
                  ordersTrendStore.push(this.assignValues("Etsy", arr[i].orders));
                }

                productViews += parseInt(arr[i].product_views);
                purchaseRate += parseInt(arr[i].purchase_rate / 3);
                checkoutRate += parseInt(arr[i].checkout_rate / 3);
                abandonedRate += parseInt(arr[i].abandoned_rate / 3);
                orderesTrendnw += parseInt(arr[i].orders_nw);
                orderesTrendsw += parseInt(arr[i].orders_sw);
                orderesTrendc += parseInt(arr[i].orders_c);
                orderesTrendne += parseInt(arr[i].orders_ne);
                orderesTrendse += parseInt(arr[i].orders_se);
              }
            }
        
            totalRevenue = amRevenue + ebRevenue + etRevenue;
            ordersTrendRegion.push({
              id: "01",
              value: orderesTrendne
            }, {
              id: "02",
              value: orderesTrendnw
            }, {
              id: "03",
              value: orderesTrendse
            }, {
              id: "04",
              value: orderesTrendsw
            }, {
              id: "05",
              value: orderesTrendc
            });
        
            selectedValue = arg;
        
            // setting state
            this.setState({
              amRevenue: formatNum(amRevenue),
              ebRevenue: formatNum(ebRevenue),
              etRevenue: formatNum(etRevenue),
              totalRevenue: formatNum(totalRevenue),
              productViews: formatNum(productViews),
              purchaseRate: purchaseRate,
              checkoutRate: checkoutRate,
              abandonedRate: abandonedRate,
              ordersTrendStore: ordersTrendStore,
              ordersTrendRegion: ordersTrendRegion,
              selectedValue: selectedValue
            });
          };

          /* end of getData */
          assignValues(companyname, orders) {
            const orderTrendTemp = [];
            orderTrendTemp.push({
              label: companyname,
              value: orders,
              displayValue: `${orders} orders`
            });
            return orderTrendTemp;
          }
          
          updateDashboard = event => {
            this.getData(event.value);
            this.setState({ selectedValue: event.value });
          };
        
          async componentDidMount() {
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw Error(response.statusText);
              }
              const data = await response.json();

                let batchRowValues = data.valueRanges[0].values;
        
                const rows = returnRows(batchRowValues);
        
                // dropdown options
                let dropdownOptions = [];
        
                for (let i = 0; i < rows.length; i++) {
                  dropdownOptions.push(rows[i].month);
                }
        
                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        
                this.setState(
                  {
                    items: rows,
                    dropdownOptions: dropdownOptions,
                    selectedValue: "Jan 2019"
                  },
                  () => this.getData("Jan 2019")
                );
            } catch (error) {
                console.log(error);
              }
          } 
          render() {
            
              return (
                <Container>
                          {/* static navbar - bottom */}
                <Nav className="navbar bg-dark is-dark is-light-text">
                  <Container className="text-medium"></Container>
                  <Container className="navbar-nav ml-auto">
                    <Dropdown
                      className="pr-2 custom-dropdown"
                      options={this.state.dropdownOptions}
                      onChange={this.updateDashboard}
                      value={this.state.selectedValue}
                      placeholder="Select an option"
                    />
                  </Container>
                </Nav>
                {/* content area start */}
                <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
                  {/* row 1 - revenue */}
                  <Container className="row">
                    <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
                      <Container className="card grid-card is-card-dark">
                        <Container className="card-heading">
                          <Container className="is-dark-text-light letter-spacing text-small">
                            Total Revenue
                          </Container>
                        </Container>

                        <Container className="card-value pt-4 text-x-large">
                          <span className="text-large pr-1">$</span>
                          {this.state.totalRevenue}
                        </Container>
                      </Container>
                    </Container>

                    <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
                      <Container className="card grid-card is-card-dark">
                        <Container className="card-heading">
                          <Container className="is-dark-text-light letter-spacing text-small">
                            Revenue from Amazon
                          </Container>
                          <Container className="card-heading-brand">
                            <i className="fab fa-amazon text-large" />
                          </Container>
                        </Container>

                        <Container className="card-value pt-4 text-x-large">
                          <span className="text-large pr-1">$</span>
                          {this.state.amRevenue}
                        </Container>
                      </Container>
                    </Container>

                    <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
                      <Container className="card grid-card is-card-dark">
                        <Container className="card-heading">
                          <Container className="is-dark-text-light letter-spacing text-small">
                            Revenue from Ebay
                          </Container>
                          <Container className="card-heading-brand">
                            <i className="fab fa-ebay text-x-large logo-adjust" />
                          </Container>
                        </Container>

                        <Container className="card-value pt-4 text-x-large">
                          <span className="text-large pr-1">$</span>
                          {this.state.ebRevenue}
                        </Container>
                      </Container>
                    </Container>

                    <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
                      <Container className="card grid-card is-card-dark">
                        <Container className="card-heading">
                          <Container className="is-dark-text-light letter-spacing text-small">
                            Revenue from Etsy
                          </Container>
                          <Container className="card-heading-brand">
                            <i className="fab fa-etsy text-medium" />
                          </Container>
                        </Container>

                        <Container className="card-value pt-4 text-x-large">
                          <span className="text-large pr-1">$</span>
                          {this.state.etRevenue}
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                  </Container>
                  </Container>
                  );
                }
              }

        export default Sheets;