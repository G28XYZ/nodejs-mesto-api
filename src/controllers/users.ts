const { Request, Response } = require('express');

const userController: Record<string, (req: Request, res: Response) => any> = {
  getUsers() {},
};

module.exports = userController;
