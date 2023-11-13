import styled from "@emotion/styled";

export const FlexContainer = styled("div")({
  display: "flex",
  //justifyContent: "center",
  alignItems: "center",
  flexDirection: "column", // Ou 'row' en fonction de l'orientation souhaitée
  height: "100vh", // 100% de la hauteur du viewport
  backgroundColor: "#f6f6f6",
});
