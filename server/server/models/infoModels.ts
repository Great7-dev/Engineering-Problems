let allOrganizations = require("../../database.json");
import { writeDataToFile } from "../utils";

interface organizationObject {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  id: number;
  noOfEmployees: number;
  employees: string[];
}

function getAllInfo() {
  return new Promise((resolve, reject) => {
    resolve(allOrganizations);
  });
}

function findById(id: number) {
  return new Promise((resolve, reject) => {
    const organization = allOrganizations.find(
      (org: organizationObject) => org.id == id
    );
    resolve(organization);
  });
}

function create(organization: organizationObject) {
  return new Promise((resolve, reject) => {
    let createdAt = new Date().toISOString();
    if (allOrganizations.length === 0) {
      let newId = 1;
      const newOrg = {
        ...organization,
        id: newId,
        createdAt,
        updatedAt: createdAt,
      };

      allOrganizations.push(newOrg);
      writeDataToFile("./database.json", allOrganizations);
      resolve(newOrg);
    } else {
      const newId = allOrganizations[allOrganizations.length - 1].id + 1;
      const newOrg = {
        ...organization,
        id: newId,
        createdAt,
        updatedAt: createdAt,
      };
      allOrganizations.push(newOrg);
      writeDataToFile("./database.json", allOrganizations);
      resolve(newOrg);
    }
  });
}

function update(id: number, orgData: organizationObject) {
  return new Promise((resolve, reject) => {
    const updatedAt = new Date().toISOString();
    const index = allOrganizations.findIndex(
      (org: organizationObject) => org.id == id
    );
    let obj = {
      updatedAt,
      id: +id,
    };
    allOrganizations[index] = { ...orgData, ...obj };
    writeDataToFile("./database.json", allOrganizations);
    resolve(allOrganizations[index]);
  });
}

function remove(id: number) {
  return new Promise((resolve, reject) => {
    allOrganizations = allOrganizations.filter(
      (org: organizationObject) => org.id != id
    );
    writeDataToFile("./database.json", allOrganizations);
    resolve(1);
  });
}

module.exports = {
  getAllInfo,
  findById,
  create,
  update,
  remove,
};