import logo from "../../assets/icons/ichgramLogo.svg"


function ImgLogo({ height, width }) {
  return (
    <img 
    style={{height: height, width: width}}
            src = {logo}
            alt="icons"
          />
  );
}

export default ImgLogo;
