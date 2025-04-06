import FrameSvg from "../../assets/svg/FrameSvg";
import PadlockSvg from "../../assets/svg/Padlock";
import RedSvg from "../../assets/svg/RedSvg";
import UserCircleSvg from "../../assets/svg/UserCircle";
import UserListSvg from "../../assets/svg/UserListSvg";
import UserSvg from "../../assets/svg/UserSvg";

export const OPTIONS_ACCOUNT = {
  1: {
    name: "Información personal",
    path: "editProfile",
    icon: <UserSvg />,
  },
  2: {
    name: "Contraseña",
    path: "resetPassword",
    icon: <PadlockSvg />,
  },
  3: {
    name: "Lenguaje",
    icon: <FrameSvg />,
  },
  4: {
    name: "Mis favoritos",
    path: "favorites",
    icon: <RedSvg />,
  },
  5: {
    name: "Politicas de privacidad",
    icon: <UserCircleSvg />,
  },
  6: {
    name: "Términos de uso",
    icon: <UserListSvg />,
  },
};
