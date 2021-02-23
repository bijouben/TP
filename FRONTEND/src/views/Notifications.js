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

const LoanTable = ({ id, name, famille, remove }) => {
  console.log(id);
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{famille}</td>
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
  const [material, setMaterial] = React.useState([]);
  const [id, setID] = React.useState();
  const [name, setName] = React.useState();
  const [famille, setFamille] = React.useState();

  useEffect(() => {
    const fetchServices = () =>
      axios.get("http://localhost:8000/materiels").then((res) => {
        console.log(res.data);
        setMaterial(res.data);
      });
    fetchServices();
  }, []);

  const add = (mat) => {
    axios.post("http://localhost:8000/materiels/add", { mat }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const remove = (id) => {
    console.log("on click");
    if (window.confirm("Are you sure?"))
      axios.delete(`http://localhost:8000/materiels/delete/${id}`);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Ajouter un Matériel</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Material ID</label>
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
                        <label>Material</label>
                        <Input
                          placeholder="Exemple : Atelier"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Famille</label>
                        <Input
                          placeholder="Exemple : 4"
                          type="text"
                          onChange={(e) => {
                            setFamille(e.target.value);
                          }}
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
                    const mat = {
                      idmaterial: id,
                      materialName: name,
                      id_Famille: famille,
                    };
                    add(mat);
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
                <CardTitle tag="h4">Material</CardTitle>
              </CardHeader>
              <CardBody>
                <Table
                  style={{ overflowX: "hidden !important" }}
                  className="tablesorter"
                  responsive
                >
                  <thead className="text-primary">
                    <tr>
                      <th>Material ID</th>
                      <th>Material</th>
                      <th>Famille</th>
                    </tr>
                  </thead>
                  <tbody>
                    {material.map((loan) => {
                      return (
                        <>
                          <LoanTable
                            id={loan.idmaterial}
                            name={loan.materialName}
                            famille={loan.id_Famille}
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
