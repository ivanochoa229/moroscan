import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PrincBtn from "../PrincBtn";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Simulation = () => {
  const { idSimulation } = useParams();
  const [simulationData, setSimulationData] = useState([]);

  const fetchSimulationData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/production/" + idSimulation
      );
      console.log("Simulation Data:", response.data);
      setSimulationData(response.data);
    } catch (error) {
      console.error("Error fetching simulation data:", error);
    }
  };

  useEffect(() => {
    fetchSimulationData();
  }, []);

  const data = {
    labels: ["Pérdida Total (Kg)", "Producción Real (Kg)"],
    datasets: [
      {
        data: [
          Number(simulationData.lost_production) || 0,
          Number(simulationData.real_production) || 0,
        ],
        backgroundColor: ["#ff3434", "#7ed957"],
        borderColor: ["#000000"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top", // Cambiar a la izquierda
        labels: {
          color: "#ffffff", // Letras blancas
          boxWidth: 20,
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <Container className="py-5 d-flex align-items-center justify-content-center">
      <div className="p-4 h-100 d-flex flex-column backgroundCard  my-auto">
        <div className="h-25 d-flex flex-column ">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Resultados de Simulación </h2>
            <span>Fecha: {simulationData.date_simulation}</span>
          </div>

          <p>Producción {simulationData.id_production} </p>
        </div>

        <div className="d-flex w-100 jutify-content-end">
          <div className="w-auto h-auto">
            <div style={{ width: "380px", height: "380px" }}>
              {simulationData.real_production !== undefined && (
                <Pie data={data} options={options} className="w-100 h-100" />
              )}
            </div>
          </div>

          <div className="d-flex flex-column ms-5 justify-content-between align-items-start h-100">
            <div className="d-flex flex-column justify-content-between h-100">
              <div className="my-2">
                <h4>Tipo de Primavera: </h4>
                <h5>
                  {simulationData.spring_type === 1 && (
                    <>
                      <span>Tipo 1 - Cálida ☀️</span>
                    </>
                  )}
                  {simulationData.spring_type === 2 && (
                    <>
                      <span>Tipo 2 - Normal 🌤</span>
                    </>
                  )}
                  {simulationData.spring_type === 3 && (
                    <>
                      <span>Tipo 3 - Fresca 🌥</span>
                    </>
                  )}
                </h5>
              </div>

              <ul>
                <li>
                  Parcelas Totales:
                  <strong> {simulationData.quantity_plots}</strong>
                </li>
                <li>
                  Parcelas Afectadas:
                  <strong> {simulationData.quantity_affected_plots}</strong>
                </li>
                <li>
                  Producción esperada:
                  <strong>
                    {" "}
                    {Number(simulationData.expected_production).toFixed(2)} Kg.
                  </strong>
                </li>
                <li>
                  Perdida en la producción{" "}
                  <strong>
                    {" "}
                    {Number(simulationData.lost_production).toFixed(2)} Kg.
                  </strong>
                </li>
                <li>
                  Producción Real:{" "}
                  <strong>
                    {" "}
                    {Number(simulationData.real_production).toFixed(2)} Kg.
                  </strong>
                </li>
              </ul>
              <div className="mt-auto ">
                <p>
                  Recomendación:
                  <strong>
                    {" "}
                    {simulationData.invert
                      ? " Invertir en medidas de control 🛑"
                      : " No invertir en medidas de control ✅"}
                  </strong>
                </p>
              </div>
            </div>
            <div>
              <p>Ir a:</p>
              <div className="d-flex gap-3">
                <Link to="/">
                  <PrincBtn text="Menú" />
                </Link>
                <Link to="/history">
                  <PrincBtn text="Historial" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor con gráfico y leyenda */}
      </div>
    </Container>
  );
};

export default Simulation;
