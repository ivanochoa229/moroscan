import React from "react";
import { Container } from "react-bootstrap";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.png";
import PrincBtn from "../PrincBtn";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container className=" py-5 d-flex align-items-center justify-content-center vh-100">
      <div className="p-4 h-auto d-flex flex-column  backgroundCard">
        <div className=" text-center h-25 d-flex flex-column justify-content-center align-items-center">
          <h1>
            MoroScan <i class="bi bi-leaf-fill"></i>
          </h1>
          <p className="my-3">
            Anticipa el riesgo, cuidá tu cosecha: visualiza el efecto del “bicho
            moro” en el tabaco.
          </p>
        </div>
        <div className="h-auto d-flex flex-row justify-content-center align-items-center ">
          <div className="w-50">
            <div>
              <h3 className="text-center mb-3">Bienvenido</h3>
              <p>
                Si desea iniciar una nueva simulación pulse el botón Simular
              </p>
              <p className="mb-5">
                Si desea ver el historial de simulaciones pulse el botón
                Historial
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5 gap-3">
              
              <Link to="/simulator">
                <PrincBtn text="Simular"></PrincBtn>
              </Link>
              <Link to="/history">
                <PrincBtn text="Historial"></PrincBtn>
              </Link>

            </div>
          </div>
          <div className="w-50 d-flex flex-column justify-content-between align-items-center backgroundImages p-1">
            <div className="h-50">
              <img
                src={img1}
                alt="img1"
                className="img-fluid w-100"
                width={50}
              />
            </div>
            <div className="h-50 d-flex mt-1 gap-1">
              <div className="w-50 h-100">
                <img
                  src={img2}
                  alt="img2"
                  className="img-fluid w-100 h-100 object-fit-cover"
                  width={50}
                />
              </div>
              <div className="w-50 h-100">
                <img
                  src={img3}
                  alt="img3"
                  className="img-fluid w-100 h-100 "
                  width={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Index;
