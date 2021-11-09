const express = require("express");
const app = express();
const PORT = 8080;
const ramp = require("./ramp");

app.use(express.json());

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.get("/smile", (req, res) => {
  res.status(200).send({
    smile: "^ - ^",
    size: "large",
  });
});

app.post("/smile/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "We need a logo!" });
  }

  res.send({
    smile: `^ - ^ with your ${logo} and ID of ${id}`,
  });
});

app.post("/ramp", ramp);
