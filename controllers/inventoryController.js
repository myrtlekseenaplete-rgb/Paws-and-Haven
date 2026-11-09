const Inventory = require('../models/Inventory');


exports.renderInventoryPage = async (req, res, next) => {
  try {
    res.render('member-F/inventory', { items: await Inventory.getAll() });
  } catch (err) { next(err); }
};


exports.getAllItems = async (req, res) => res.json(await Inventory.getAll());

exports.getItemById = async (req, res) => res.json(await Inventory.getById(req.params.id));

exports.createItem = async (req, res) => {
  const { item_name, category, quantity, unit } = req.body;
  const id = await Inventory.create(item_name, category, quantity, unit);
  res.status(201).json({ message: 'Item created', id });
};

exports.updateItem = async (req, res) => {
  const { item_name, category, quantity, unit } = req.body;
  await Inventory.update(req.params.id, item_name, category, quantity, unit);
  res.json({ message: 'Item updated successfully' });
};

exports.deleteItem = async (req, res) => {
  await Inventory.delete(req.params.id);
  res.json({ message: 'Item deleted successfully' });
};