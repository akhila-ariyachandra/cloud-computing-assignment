import type { VercelRequest, VercelResponse } from "@vercel/node";

const VEHICLES = [
  {
    regNo: "1a",
    regDate: "01-01-2022",
    chassisNo: "12",
  },
  {
    regNo: "2b",
    regDate: "23-01-2022",
    chassisNo: "12",
  },
  {
    regNo: "3c",
    regDate: "02-02-2022",
    chassisNo: "12",
  },
  {
    regNo: "4d",
    regDate: "15-03-2022",
    chassisNo: "12",
  },
  {
    regNo: "5e",
    regDate: "01-06-2022",
    chassisNo: "12",
  },
];

export default (request: VercelRequest, response: VercelResponse) => {
  const { regNo } = request.query;

  const vehicle = VEHICLES.find((item) => item.regNo === regNo);

  if (vehicle) {
    return response.status(200).json(vehicle);
  } else {
    return response.status(404).json({ message: "Not Found" });
  }
};
