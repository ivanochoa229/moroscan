import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Loader from "../Loader";

const SimulatorForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      setLoading(true); // 🔄 Mostrar loader
      const response = await axios.post("http://localhost:8080/production", {
        quantity_plots: data.quantity_plots,
      });

      const simulationId = response.data.id_production;

      // ⏱️ Esperar 3 segundos antes de redirigir
      setTimeout(() => {
        navigate("/simulation/" + simulationId);
      }, 1200);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setLoading(false); // ❌ Ocultar loader si hay error
    }
  };

  return (
    <Container className=" py-5 d-flex align-items-center justify-content-center vh-100">
      <StyledWrapper>
        <div className="d-flex justify-content-end ">
          <Link to="/">
            <i class="bi bi-x-square"></i>
          </Link>
        </div>
        <div className="login wrap">
          <h1 className="h1 text-center">
            MoroScan <i class="bi bi-leaf-fill"></i>
          </h1>

          <>
            {loading ? (
              <Loader />
            ) : (
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input
                  placeholder="Cantidad de Parcelas"
                  id="1"
                  name="quantity_plots"
                  type="number"
                  min="1"
                  step="1"
                  {...register("quantity_plots", {
                    required: " Este campo es obligatorio",
                    min: {
                      value: 1,
                      message: "Debe ingresar al menos 1 parcela",
                    },
                  })}
                />

                {errors.quantity_plots ? (
                  <p className=" mt-2">
                    <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                    &nbsp;
                    {errors.quantity_plots.message}
                  </p>
                ) : (
                  <p className=" mt-2">&nbsp;</p>
                )}

                <div>
                  <input value="Simular" className="btn" type="submit" />
                </div>
              </form>
            )}
          </>
        </div>
      </StyledWrapper>
    </Container>
  );
};

const StyledWrapper = styled.div`
  .login {
    width: auto;
    height: auto;
    background: #486832;
    padding: 47px;
    color: #fff;
    border-radius: 10px;
    padding-bottom: 50px;
    font-size: 1.5em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    box-shadow: 10px 10px 19px -2px rgba(23, 29, 18, 0.75);
    -webkit-box-shadow: 10px 10px 19px -2px rgba(23, 29, 18, 0.75);
    -moz-box-shadow: 10px 10px 19px -2px rgba(23, 29, 18, 0.75);
  }

  .login input[type="number"] {
    opacity: 1;
    display: block;
    border: none;
    outline: none;
    width: 100%;
    padding: 13px 18px;
    margin: 20px 0 0 0;
    font-size: 0.8em;
    border-radius: 100px;
    background: #ffff;
    color: #171d12;
  }

  .login input:focus {
    animation: bounce 1s;
    -webkit-appearance: none;
  }

  .login input[type="submit"],
  .login input[type="button"],
  .h1 {
    border: 0;
    outline: 0;
    width: 100%;
    padding: 13px;
    margin: 40px 0 0 0;
    border-radius: 500px;
    font-weight: 600;
    animation: bounce2 1.2s;
  }

  .h1 {
    padding: 0;
    position: relative;
    top: -35px;
    display: block;
    margin-bottom: -0px;
    text-align: center;
    font-size: 2.2em;
  }

  .btn {
    background: #171d12;
    box-shadow: 7px 7px 10px -3px rgba(23, 29, 18, 0.75);
    -webkit-box-shadow: 7px 7px 10px -3px rgba(23, 29, 18, 0.75);
    -moz-box-shadow: 7px 7px 10px -3px rgba(23, 29, 18, 0.75);
    color: #fff;
    padding: 16px !important;
  }

  .btn:hover {
    background: #537d3d;
    color: rgb(255, 255, 255);
    padding: 16px !important;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .login input[name="quantity_plots"] {
    animation: bounce 1.2s;
    -webkit-appearance: none;
  }

  @media only screen and (max-width: 600px) {
    .login {
      width: 70%;
      padding: 3em;
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(-250px);
      opacity: 0;
    }
  }

  @keyframes bounce1 {
    0% {
      opacity: 0;
    }

    40% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }

  @keyframes bounce2 {
    0% {
      opacity: 0;
    }

    70% {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
`;

export default SimulatorForm;
