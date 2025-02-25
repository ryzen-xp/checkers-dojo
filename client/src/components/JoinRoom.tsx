import { useNavigate } from 'react-router-dom';
import CreateBurner from "../connector/CreateBurner.tsx";
import { SDK } from "@dojoengine/sdk";
import { schema } from "../bindings.ts";
// import ControllerButton from '../connector/ControllerButton.tsx';
import { useDojo } from "../hooks/useDojo.tsx";

import LoadingRoom from "../assets/LoadingCreate.png";
import InitGameBackground from "../assets/InitGameBackground.png";
import Return from "../assets/Return.png";
import JoinGameRectangule from "../assets/JoinGameRectangule.png";
import ConfirmJoin from "../assets/ConfirmJoin.png";
import { useAccount } from '@starknet-react/core';
import { Account } from 'starknet';

function JoinRoom({ }: { sdk: SDK<typeof schema> }) {
    const {
      // account: { account },
      setup: { setupWorld },
    } = useDojo();
    const {account} = useAccount();
  const navigate = useNavigate();

  const joinRoom = async () => {
    try {
      if (account) {
        //TODO:sacar todas las funciones spawn del front
        await(await setupWorld.actions).joinLobby((account as Account), 0);
        navigate("/creategame");
      } else {
        console.warn("Cuenta no conectada");
      }
    } catch (error) {
      console.error("Error al crear la sesión:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${InitGameBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Filtro de fondo oscuro */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />

      {/* Botón de "Return" */}
      <button
        onClick={() => {
          window.location.href = '/initgame'; 
        }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <img
          src={Return}
          alt="Return"
          style={{
            width: '50px',
            height: '50px',
          }}
        />
      </button>

      {/* Sección superior derecha con CreateBurner y ControllerButton */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '20px',
          zIndex: 2,
        }}
      >
        {/* <ControllerButton /> */}
        <CreateBurner />
      </div>

      {/* Texto "Join Room" sobre la barra de carga */}
      <div
        style={{
          position: 'absolute',
          top: '150px',
          left: '16%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          zIndex: 5,
        }}
      >
        JOIN ROOM
      </div>

      {/* Barra de carga */}
      <div
        style={{
          position: 'absolute',
          top: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1500px',
          height: '10px',
          zIndex: 5,
        }}
      >
        <img
          src={LoadingRoom}
          alt="Cargando"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Texto "Room ID" sobre el rectángulo de la sesión */}
      <div
        style={{
          position: 'absolute',
          bottom: '590px',
          left: '31%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 5,
        }}
      >
        Room ID
      </div>

      {/* Rectángulo que muestra la sesión */}
      <div
        style={{
          position: 'absolute',
          bottom: '450px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '840px',
          height: '132px',
          backgroundImage: `url(${JoinGameRectangule})`,
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 5,
        }}
      >
        0
      </div>

      {/* Botón de "Confirmar" */}
      <button
        onClick={joinRoom}  // Actualizado a handleCreateRoom con create_session
        style={{
          position: 'absolute',
          bottom: '180px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundImage: `url(${ConfirmJoin})`,
          backgroundSize: 'cover',
          width: '700px',
          height: '96px',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: 'pointer',
          border: 'none',
          zIndex: 5,
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default JoinRoom;
