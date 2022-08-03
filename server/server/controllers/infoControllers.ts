const Info = require("../models/infoModels");
import { IncomingMessage, ServerResponse } from "node:http";
import { getPostData } from "../utils";

interface organizationObject {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
}

// @desc Gets all Organizations
// @route GET /api/info

async function getInfo(req: IncomingMessage, res: ServerResponse) {
  try {
    const info = await Info.getAllInfo();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(info));
  } catch (error) {
    console.log(error);
  }
}

// @desc Gets a particular organization by id
// @route  GET /api/info/:id

async function getOneInfo(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const info = await Info.findById(id);
    if (!info) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(info));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Create an Organization
// @route  POST /api/org

async function createOrganization(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req);

    const {
      organization,
      createdAt,
      updatedAt,
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    } = JSON.parse(body as string);

    const org = {
      organization,
      createdAt,
      updatedAt,
      products,
      marketValue,
      address,
      ceo,
      country,
      noOfEmployees,
      employees,
    };

    const newOrg = await Info.create(org);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newOrg));
  } catch (error) {
    console.log(error);
  }
}

// @desc Edits an Organization
// @route  PATCH /api/org/:id

async function updateOrganization(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const item = await Info.findById(id);

    if (!item) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization Not Found" }));
    } else {
      const body = await getPostData(req);

      const {
        organization,
        createdAt,
        updatedAt,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = JSON.parse(body as string);

      const orgData: organizationObject = {
        organization: organization || item.organization,
        createdAt: createdAt || item.createdAt,
        updatedAt: updatedAt || item.updatedAt,
        products: products || item.products,
        marketValue: marketValue || item.marketValue,
        address: address || item.address,
        ceo: ceo || item.ceo,
        country: country || item.country,
        noOfEmployees: noOfEmployees || item.noOfEmployees,
        employees: employees || item.employees,
      };

      const updateOrg = await Info.update(id, orgData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updateOrg));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc removes a particular organization by id
// @route DELETE /api/org/:id

async function removeOrganization(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const info = await Info.findById(id);
    if (!info) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Organization Not Found" }));
    } else {
      await Info.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Organization with id of ${id} has been removed`,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getInfo,
  getOneInfo,
  createOrganization,
  updateOrganization,
  removeOrganization,
};