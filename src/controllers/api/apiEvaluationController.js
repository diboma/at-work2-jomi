// Import models
import User from '../../models/User.js';
import IcfCode from '../../models/evaluation/IcfCode.js';
import IcfEvaluation from '../../models/evaluation/IcfEvaluation.js';
import IcfRating from '../../models/evaluation/IcfRating.js';
import InflowEvaluation from '../../models/evaluation/InflowEvaluation.js';
import TechnicalEvaluation from '../../models/evaluation/TechnicalEvaluation.js';
import TechnicalLevel from '../../models/evaluation/TechnicalLevel.js';

/**
 * Show evaluation
 */
export const showEval = async (req, res, next) => {
  const { type, evalId } = req.params;

  // Handle inflow evaluation
  // ------------------------
  if (type === 'inflow') {
    // Get evaluation
    const inflowEval = await InflowEvaluation.query()
      .withGraphFetched('maatwerkcoach')
      .findById(evalId);

    if (!inflowEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Return view
    return res.render('partials/evaluation/api/show-inflow', {
      layout: null,
      inflowEval,
    });
  }

  // Handle ICF evaluation
  // ---------------------
  if (type === 'icf') {
    // Get evaluation
    const icfEval = await IcfEvaluation.query()
      .withGraphFetched('[maatwerkcoach, code, rating]')
      .findById(evalId);

    if (!icfEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Return view
    return res.render('partials/evaluation/api/show-icf', {
      layout: null,
      icfEval,
    });
  }

  // Handle technical evaluation
  // ---------------------------
  if (type === 'tech') {
    // Get evaluation
    const techEval = await TechnicalEvaluation.query()
      .withGraphFetched('[maatwerkcoach, level]')
      .findById(evalId);

    if (!techEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Return view
    return res.render('partials/evaluation/api/show-tech', {
      layout: null,
      techEval,
    });
  }
};

/**
 * Show edit evaluation
 */
export const showEditEval = async (req, res, next) => {
  const { type, evalId } = req.params;

  // Get coaches
  // -----------
  const maatwerkcoaches = await User.query()
    .where('role_id', 1)
    .select('id', 'firstname', 'lastname');

  // Handle show inflow evaluation
  // -----------------------------
  if (type === 'inflow') {
    // Get evaluation
    const inflowEval = await InflowEvaluation.query()
      .withGraphFetched('maatwerkcoach')
      .findById(evalId);

    if (!inflowEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Return view
    return res.render('partials/evaluation/api/edit-inflow', {
      layout: null,
      maatwerkcoaches,
      inflowEval,
    });
  }

  // Handle show ICF evaluation
  // --------------------------
  if (type === 'icf') {
    // Get evaluation
    const icfEval = await IcfEvaluation.query()
      .withGraphFetched('[maatwerkcoach, code, rating]')
      .findById(evalId);

    if (!icfEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Get ICF codes and ratings
    const icfCodes = await IcfCode.query().withGraphFetched('category');
    const icfRatings = await IcfRating.query().withGraphFetched('category');

    // Return view
    return res.render('partials/evaluation/api/edit-icf', {
      layout: null,
      maatwerkcoaches,
      icfEval,
      icfCodes,
      icfRatings,
    });
  }

  // Handle show technical evaluation
  // --------------------------------
  if (type === 'tech') {
    // Get evaluation
    const techEval = await TechnicalEvaluation.query()
      .withGraphFetched('[maatwerkcoach, level]')
      .findById(evalId);

    if (!techEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Get technical levels
    const techLevels = await TechnicalLevel.query();

    // Return view
    return res.render('partials/evaluation/api/edit-tech', {
      layout: null,
      maatwerkcoaches,
      techEval,
      techLevels,
    });
  }
};

/**
 * Handle update evaluation
 */
export const handleUpdateEval = async (req, res, next) => {
  const { type, evalId } = req.params;

  // Handle update of inflow evaluation
  // ----------------------------------
  if (type === 'inflow') {
    // Get evaluation
    const inflowEval = await InflowEvaluation.query().findById(evalId);

    if (!inflowEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Update evaluation
    if (req.body.maatwerkcoach_id !== '' && req.body.content !== '') {
      await InflowEvaluation.query()
        .findById(evalId)
        .patch({
          maatwerkcoach_id: parseInt(req.body.maatwerkcoach_id),
          content: req.body.content,
          comment: req.body.comment,
          updated_at: new Date(),
        });
    }

    // Get updated evaluation
    const updatedEval = await InflowEvaluation.query().findById(evalId);

    // Return view
    return res.render('partials/evaluation/api/show-inflow', {
      layout: null,
      inflowEval: updatedEval,
    });
  }

  // Handle update of ICF evaluation
  // -------------------------------
  if (type === 'icf') {
    // Get evaluation
    const icfEval = await IcfEvaluation.query().findById(evalId);

    if (!icfEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Update evaluation
    if (
      req.body.maatwerkcoach_id !== '' &&
      req.body.icf_code_id !== '' &&
      req.body.icf_rating_id !== ''
    ) {
      await IcfEvaluation.query()
        .findById(evalId)
        .patch({
          maatwerkcoach_id: parseInt(req.body.maatwerkcoach_id),
          icf_code_id: req.body.icf_code_id,
          icf_rating_id: parseInt(req.body.icf_rating_id),
          comment: req.body.comment,
          updated_at: new Date(),
        });
    }

    // Get updated evaluation
    const updatedEval = await IcfEvaluation.query()
      .withGraphFetched('[maatwerkcoach, code, rating]')
      .findById(evalId);

    // Return view
    return res.render('partials/evaluation/api/show-icf', {
      layout: null,
      icfEval: updatedEval,
    });
  }

  // Handle update of technical evaluation
  // -------------------------------------
  if (type === 'tech') {
    // Get evaluation
    const techEval = await TechnicalEvaluation.query().findById(evalId);

    if (!techEval) {
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie werd niet gevonden',
        },
      });
    }

    // Update evaluation
    if (
      req.body.maatwerkcoach_id !== '' &&
      req.body.technical_level_id !== ''
    ) {
      await TechnicalEvaluation.query()
        .findById(evalId)
        .patch({
          maatwerkcoach_id: parseInt(req.body.maatwerkcoach_id),
          technical_level_id: parseInt(req.body.technical_level_id),
          comment: req.body.comment,
          updated_at: new Date(),
        });
    }

    // Get updated evaluation
    const updatedEval = await TechnicalEvaluation.query()
      .withGraphFetched('[maatwerkcoach, level]')
      .findById(evalId);

    // Return view
    return res.render('partials/evaluation/api/show-tech', {
      layout: null,
      techEval: updatedEval,
    });
  }
};

/**
 * Delete evaluation
 */
export const deleteEval = async (req, res, next) => {
  const { type, evalId } = req.params;

  // Handle inflow evaluation
  // -----------------------
  if (type === 'inflow') {
    try {
      await InflowEvaluation.query().deleteById(evalId);
      return res.send('');
    } catch (error) {
      console.log(error);
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie kon niet worden verwijderd',
        },
      });
    }
  }

  // Handle ICF evaluation
  // ---------------------
  if (type === 'icf') {
    try {
      await IcfEvaluation.query().deleteById(evalId);
      return res.send('');
    } catch (error) {
      console.log(error);
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie kon niet worden verwijderd',
        },
      });
    }
  }

  // Handle technical evaluation
  // ---------------------------
  if (type === 'tech') {
    try {
      await TechnicalEvaluation.query().deleteById(evalId);
      return res.send('');
    } catch (error) {
      console.log(error);
      return res.render('partials/flash', {
        layout: null,
        flash: {
          type: 'danger',
          message: 'De evaluatie kon niet worden verwijderd',
        },
      });
    }
  }
};
