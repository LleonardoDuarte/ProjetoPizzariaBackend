import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { IsAuthenticated } from "./middlewares/IsAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import uploadConfig from "./config/Multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.get("/teste", (req: Request, res: Response) => {
  return res.json({ ok: true });
});

// ROTAS USER
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", IsAuthenticated, new DetailUserController().handle);

// ROTAS CATEGORY
router.post(
  "/category",
  IsAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", IsAuthenticated, new ListCategoryController().handle);

// ROTAS PRODUCT

router.post(
  "/product",
  IsAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  IsAuthenticated,
  new ListByCategoryController().handle
);

// ROTAS ORDER
router.post("/order", IsAuthenticated, new CreateOrderController().handle);

router.delete("/delete", IsAuthenticated, new RemoveOrderController().handle);

router.post("/order/add", IsAuthenticated, new AddItemController().handle);

router.delete(
  "/order/remove",
  IsAuthenticated,
  new RemoveItemController().handle
);

router.put("/order/send", IsAuthenticated, new SendOrderController().handle);

router.get("/orders", IsAuthenticated, new ListOrdersController().handle);

router.get(
  "/orders/detail",
  IsAuthenticated,
  new DetailOrderController().handle
);

router.post(
  "/order/finish",
  IsAuthenticated,
  new FinishOrderController().handle
);

export { router };
