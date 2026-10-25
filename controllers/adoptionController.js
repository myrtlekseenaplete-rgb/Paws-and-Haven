const Adoption = require("../models/adoptionModel");

const validStatuses = ["Pending", "Approved", "Rejected", "Completed"];

exports.dashboard = async (req, res, next) => {
  try {
    const applications = await Adoption.getAllApplications();
    const adoptions = await Adoption.getCompletedAdoptions();
    res.render("adoptions/dashboard", { applications, adoptions, error: null });
  } catch (error) {
    next(error);
  }
};

exports.showNewForm = (req, res) => {
  res.render("adoptions/new", { error: null });
};

exports.create = async (req, res, next) => {
  try {
    const { user_id, animal_id, application_date, notes } = req.body;
    if (!user_id || !animal_id) {
      return res.status(400).render("adoptions/new", {
        error: "Please enter both a user ID and an animal ID.",
      });
    }
    await Adoption.createApplication({
      user_id,
      animal_id,
      application_date,
      notes,
    });
    res.redirect("/adoptions");
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const status = req.body.status;
    if (!validStatuses.includes(status)) {
      return res.status(400).send("Invalid application status.");
    }
    const changed = await Adoption.updateStatus(req.params.id, status);
    if (!changed) return res.status(404).send("Application not found.");
    res.redirect("/adoptions");
  } catch (error) {
    next(error);
  }
};

exports.showProcessForm = async (req, res, next) => {
  try {
    const application = await Adoption.getApplicationById(req.params.id);
    if (!application) return res.status(404).send("Application not found.");
    res.render("adoptions/process", { application, error: null });
  } catch (error) {
    next(error);
  }
};

exports.finalize = async (req, res, next) => {
  try {
    const { adoption_date, adoption_fee, contract_details } = req.body;
    await Adoption.finalizeAdoption(req.params.id, {
      adoption_date,
      adoption_fee,
      contract_details,
    });
    res.redirect("/adoptions");
  } catch (error) {
    const application = await Adoption.getApplicationById(req.params.id).catch(
      () => null
    );
    if (!application) return res.status(404).send("Application not found.");
    res
      .status(400)
      .render("adoptions/process", { application, error: error.message });
  }
};