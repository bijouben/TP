/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";

const SalaryTable = ({ id, name, phone, service, remove }) => {
  console.log(id);
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{service}</td>
        <td>
          <i onClick={() => remove(id)} class="fas fa-trash-alt"></i>
        </td>
        <td>
          <i class="fas fa-pen"></i>
        </td>
      </tr>
    </>
  );
};

function Dashboard(props) {
  const [salaries, setsalaries] = React.useState([]);
  const [id, setID] = React.useState();
  const [salary, setSalary] = React.useState();
  const [telephone, setTelephone] = React.useState();
  const [service, setService] = React.useState();

  useEffect(() => {
    const fetchServices = () =>
      axios.get("http://localhost:8000/salaries").then((res) => {
        setsalaries(res.data);
      });
    fetchServices();
  }, []);

  const add = (salary) => {
    axios.post("http://localhost:8000/salaries/add", { salary }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const remove = (id) => {
    console.log("on click");
    if (window.confirm("Are you sure?"))
      axios.delete(`http://localhost:8000/salaries/delete/${id}`);
  };

  /*useEffect(() => {
    const fetchData = async () => {
      const res = await axios("https://bijou-api.herokuapp.com/salaries");
      console.log(res);
    };
    fetchData();
  }, []); */

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Ajouter un Salarier</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Salary ID</label>
                        <Input
                          placeholder="Exemple : 4"
                          type="text"
                          onChange={(e) => {
                            setID(e.target.value);
                            console.log(id);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Salary</label>
                        <Input
                          placeholder="Exemple : Atelier"
                          type="text"
                          onChange={(e) => setSalary(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Telephone</label>
                        <Input
                          placeholder="Exemple : 4"
                          type="text"
                          onChange={(e) => {
                            setTelephone(e.target.value);
                            console.log(id);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Service</label>
                        <Input
                          placeholder="Exemple : Atelier"
                          type="text"
                          onChange={(e) => setService(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={() => {
                    const sal = {
                      matricule: id,
                      nom_sal: salary,
                      tel_sal: telephone,
                      idservices: service,
                    };
                    add(sal);
                  }}
                >
                  Ajouter
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">salaries</CardTitle>
              </CardHeader>
              <CardBody>
                <Table
                  style={{ overflowX: "hidden !important" }}
                  className="tablesorter"
                  responsive
                >
                  <thead className="text-primary">
                    <tr>
                      <th>Salary ID</th>
                      <th>Salary</th>
                      <th>Phone</th>
                      <th>Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaries.map((Salary) => {
                      return (
                        <>
                          <SalaryTable
                            id={Salary.matricule}
                            name={Salary.nom_sal}
                            phone={Salary.tel_sal}
                            service={Salary.idservices}
                            remove={remove}
                          />
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
