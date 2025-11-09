const app = require("./api/server");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running locally on port ${PORT}`));
