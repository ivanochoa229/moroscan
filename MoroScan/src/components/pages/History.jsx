import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../style/tableStyle.css";
import PrincBtn from "../PrincBtn";
import axios from "axios";

const History = () => {
  const navigate = useNavigate();
  // La variable de entorno VITE_API_BASE_URL se inyecta aquí.
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [productions, setProductions] = useState([]);

  const getAllProductions = async () => {
    try {
      // --- IMPORTANTE: Añade este console.log para verificar la URL exacta ---
      console.log("Intentando obtener datos de:", `${API_BASE_URL}/production`);

      const response = await axios.get(`${API_BASE_URL}/production`);
      setProductions(response.data);
      console.log("Datos de producción recibidos:", response.data); // Opcional: Para ver los datos si la llamada es exitosa
    } catch (error) {
      console.error("Error al obtener datos:", error);

      // --- Detalles adicionales del error para una mejor depuración ---
      if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        console.error("Respuesta de error del servidor:", error.response.data);
        console.error("Estado del error del servidor:", error.response.status);
        console.error("Headers de respuesta del servidor:", error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor (la solicitud fue enviada):", error.request);
      } else {
        // Algo más ocurrió al configurar la solicitud que disparó un error
        console.error("Error al configurar la solicitud:", error.message);
      }
      console.error("Configuración de la solicitud de Axios:", error.config);
    }
  };

  useEffect(() => {
    getAllProductions();
  }, []);

  return (
    <div className="py-5 d-flex align-items-center vh-100 width">
      <div className="p-4 h-100 d-flex flex-column backgroundCard backgroundCardHistory">
        <div className="text-center h-25 d-flex flex-column justify-content-center align-items-center">
          <h1>
            Historial de Simulaciones <i className="bi bi-leaf-fill"></i>
          </h1>
        </div>

        <div className="h-75 d-flex flex-row justify-content-center  overflow-wrapper">
          <div className="table-scroll">
            <Table
              hover
              bordered
              responsive
              className="text-center tabla-historial"
            >
              <thead className="table-dark">
                <tr>
                  <th>Fecha</th>
                  <th>Parcelas de Terreno</th>
                  <th>Producción Esperada (Kg.)</th>
                  <th>Pérdida (Kg.)</th>
                  <th>Producción Real (Kg.)</th>
                  <th>Tipo de primavera</th>
                  <th>Inversión</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((production) => (
                  <tr
                    key={production.id_production}
                    className="clickable-row"
                    onClick={() =>
                      navigate(`/simulation/${production.id_production}`)
                    }
                  >
                    <td>{production.date_simulation}</td>
                    <td>{production.quantity_plots}</td>
                    <td>
                      {Number(production.expected_production).toFixed(2)}
                    </td>
                    <td>{Number(production.lost_production).toFixed(2)}</td>
                    <td>{Number(production.real_production).toFixed(2)}</td>
                    <td>
                      {production.spring_type === 1 && (
                        <>
                          <span>Tipo 1 - Cálida ☀️</span>
                        </>
                      )}
                      {production.spring_type === 2 && (
                        <>
                          <span>Tipo 2 - Normal 🌤</span>
                        </>
                      )}
                      {production.spring_type === 3 && (
                        <>
                          <span>Tipo 3 - Fresca 🌧</span>
                        </>
                      )}
                    </td>
                    <td>
                      {production.invert
                        ? "Si"
                        : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="ms-auto mt-4">
          <Link to="/">
            <PrincBtn text="Volver" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default History;
