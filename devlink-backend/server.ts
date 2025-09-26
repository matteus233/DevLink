import express, {type  Request, type Response} from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.ts";
import linkRouters from "./src/routes/linkRoutes.ts";



const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.use("/auth", authRoutes);
app.use("/links", linkRouters);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
