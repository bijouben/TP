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

const LoanTable = ({ id, date, rback, notes, material, salary, remove }) => {
  console.log(id);
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{date}</td>
        <td>{rback}</td>
        <td>{notes}</td>
        <td>{material}</td>
        <td>{salary}</td>
        <td>
          <i onClick={() => remove(id)} class="fas fa-trash-alt"></i>
        </td>
      </tr>
    </>
  );
};

function Dashboard(props) {
  const [loans, setloans] = React.useState([]);
  const [id, setID] = React.useState();
  const [date, setDate] = React.useState();
  const [giveBack, setGiveBack] = React.useState();
  const [notes, setNotes] = React.useState();
  const [material, setMaterial] = React.useState();
  const [salaries, setSalaries] = React.useState();

  useEffect(() => {
    const fetchServices = () =>
      axios.get("http://localhost:8000/emprunts").then((res) => {
        console.log(res.data);
        setloans(res.data);
      });
    fetchServices();
  }, []);

  const add = (loan) => {
    axios.post("http://localhost:8000/emprunts/add", { loan }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const remove = (id) => {
    console.log("on click");
    if (window.confirm("Are you sure?"))
      axios.delete(`http://localhost:8000/emprunts/delete/${id}`);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Ajouter un Emprunt</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>ID</label>
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
                        <label>Date de l'emprunt</label>
                        <Input
                          placeholder="AAAA-MM-JJ"
                          type="text"
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Date du retour</label>
                        <Input
                          placeholder="AAAA-MM-JJ"
                          type="text"
                          onChange={(e) => {
                            setGiveBack(e.target.value);
                            console.log(id);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Remarques</label>
                        <Input
                          placeholder="Exemple : Atelier"
                          type="text"
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Materiel</label>
                        <Input
                          placeholder="Exemple : 4"
                          type="text"
                          onChange={(e) => {
                            setMaterial(e.target.value);
                            console.log(id);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Salaries</label>
                        <Input
                          placeholder="Exemple : Atelier"
                          type="text"
                          onChange={(e) => setSalaries(e.target.value)}
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
                    const loanies = {
                      idT_Emprunt: id,
                      date_emprunt: date,
                      date_retour: giveBack,
                      remarque: notes,
                      id_materiel: material,
                      matricule: salaries,
                    };
                    add(loanies);
                  }}
                >
                  Ajouter
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="8" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Loans</CardTitle>
              </CardHeader>
              <CardBody>
                <Table
                  style={{ overflowX: "hidden !important" }}
                  className="tablesorter"
                  responsive
                >
                  <thead className="text-primary">
                    <tr>
                      <th>Loan ID</th>
                      <th>Date emprunt</th>
                      <th>Date retour</th>
                      <th>Remarques</th>
                      <th>Materiel</th>
                      <th>Salarié</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => {
                      return (
                        <>
                          <LoanTable
                            id={loan.idT_Emprunt}
                            date={loan.data_emprunt}
                            rback={loan.date_retour}
                            notes={loan.notes}
                            material={loan.id_materiel}
                            salary={loan.matricule}
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
