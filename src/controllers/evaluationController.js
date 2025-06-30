/**
 * EVALUATION CONTROLLER
 */
import icfEvaluationSchema from '../middleware/validation/icfEvaluationValidation.js';
import inflowEvaluationSchema from '../middleware/validation/inflowEvaluationValidation.js';
import techEvaluationSchema from '../middleware/validation/techEvaluationValidation.js';
import { getUserIsCoach } from '../lib/utils.js';
import { NAVITEMS } from '../lib/consts.js';

// Import models
import EvaluationStage from '../models/evaluation/EvaluationStage.js';
import IcfCategory from '../models/evaluation/IcfCategory.js';
import IcfCode from '../models/evaluation/IcfCode.js';
import IcfEvaluation from '../models/evaluation/IcfEvaluation.js';
import IcfRating from '../models/evaluation/IcfRating.js';
import InflowEvaluation from '../models/evaluation/InflowEvaluation.js';
import InflowEvaluationSubject from '../models/evaluation/InflowEvaluationSubject.js';
import Machine from '../models/evaluation/Machine.js';
import TechnicalEvaluation from '../models/evaluation/TechnicalEvaluation.js';
import TechnicalLevel from '../models/evaluation/TechnicalLevel.js';
import User from '../models/User.js';

/**
 * Index
 * Maatwerker: is redirected to page with evaluation stages
 * Maatwerkcoach: has to select the maatwerker
 */
export const index = async (req, res) => {
  // Maatwerker: redirect to show page
  if (req.user.role.id === 2) {
    return res.redirect(`/evaluatie/${req.user.id}`);
  }

  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get maatwerkers (for select element)
  const maatwerkers = await User.query()
    .select('id', 'firstname', 'lastname')
    .where('role_id', 2);

  // Render template
  res.render('evaluation/index', {
    flash,
    navItems: NAVITEMS,
    activeNav: 'evaluatie',
    pageTitle: 'Evaluatie',
    maatwerkers,
  });
};

/**
 * Show list of evaluation stages (evaluatiefasen)
 */
export const showStageList = async (req, res, next) => {
  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get id (maatwerker) from params
  const { id } = req.params;

  // Authorization
  if (req.user.role.id === 2 && parseInt(id) !== parseInt(req.user.id)) {
    return res.redirect('/', {
      flash: { message: 'Onvoldoende rechten', type: 'danger' },
    });
  }

  // Get maatwerker
  const maatwerker = await User.query().findById(id);
  if (!maatwerker) {
    return res.redirect('/evaluatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get evaluation stages
  const evalStages = await EvaluationStage.query().orderBy('id');

  // Render template
  res.render('evaluation/showStageList', {
    navItems: NAVITEMS,
    activeNav: 'evaluatie',
    pageTitle: `Evaluaties van ${maatwerker.firstname} ${maatwerker.lastname}`,
    flash,
    maatwerker,
    evalStages,
  });
};

/**
 * Show evaluations for 'Instroom'
 */
export const showInstroomEvals = async (req, res, next) => {
  // Get id (maatwerker) from params
  const { id } = req.params;

  // Authorization
  if (req.user.role.id === 2 && parseInt(id) !== parseInt(req.user.id)) {
    return res.redirect('/', {
      flash: { message: 'Onvoldoende rechten', type: 'danger' },
    });
  }

  // Get maatwerker
  const maatwerker = await User.query().findById(id);
  if (!maatwerker) {
    return res.redirect(`/evaluatie/${maatwerker.id}`, {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get data
  const evalSubjects = await InflowEvaluationSubject.query();
  const evals = await InflowEvaluation.query()
    .withGraphFetched('maatwerkcoach')
    .where('maatwerker_id', id)
    .orderBy('updated_at', 'desc');

  // Render template
  res.render('evaluation/showEvalsForInstroom', {
    navItems: NAVITEMS,
    activeNav: 'evaluatie',
    pageTitle: `Instroom ${maatwerker.firstname} ${maatwerker.lastname}`,
    maatwerker,
    urlBtnBack: `/evaluatie/${maatwerker.id}`,
    urlAddEval: `/evaluatie/${maatwerker.id}/toevoegen/instroom`,
    evalSubjects,
    evals,
    isCoach: getUserIsCoach(req.user),
  });
};

/**
 * Show evaluations for 'Fase 1-4'
 */
export const showStageEvals = async (req, res, next) => {
  // Get id (maatwerker) and slug (evaluatiefase) from params
  const { id, slug } = req.params;

  // Authorization
  if (req.user.role.id === 2 && parseInt(id) !== parseInt(req.user.id)) {
    return res.redirect('/', {
      flash: { message: 'Onvoldoende rechten', type: 'danger' },
    });
  }

  // Get maatwerker
  const maatwerker = await User.query().findById(id);
  if (!maatwerker) {
    return res.redirect('/evaluatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get evaluation stage
  const evalStage = await EvaluationStage.query().where('slug', slug).first();
  if (!evalStage) {
    return res.redirect(`/evaluatie/${maatwerker.id}`, {
      flash: { message: 'Fase niet gevonden', type: 'danger' },
    });
  }

  // Get data
  const icfCategories = await IcfCategory.query();
  const icfEvals = await IcfEvaluation.query()
    .withGraphFetched('[category, code, rating, maatwerkcoach]')
    .where('maatwerker_id', id)
    .where('evaluation_stage_id', evalStage.id)
    .orderBy('updated_at', 'desc');

  const machines = await Machine.query();
  const techEvals = await TechnicalEvaluation.query()
    .withGraphFetched('[machine, level, maatwerkcoach]')
    .where('maatwerker_id', id)
    .where('evaluation_stage_id', evalStage.id)
    .orderBy('updated_at', 'desc');

  // Render template
  res.render('evaluation/showEvalsForStage', {
    navItems: NAVITEMS,
    activeNav: 'evaluatie',
    pageTitle: `${maatwerker.firstname} ${maatwerker.lastname} ${evalStage.name} `,
    maatwerker,
    urlBtnBack: `/evaluatie/${maatwerker.id}`,
    urlAddEvalIcf: `/evaluatie/${maatwerker.id}/toevoegen/icf?fase=${evalStage.slug}`,
    urlAddEvalTech: `/evaluatie/${maatwerker.id}/toevoegen/technisch?fase=${evalStage.slug}`,
    icfCategories,
    icfEvals,
    machines,
    techEvals,
    isCoach: getUserIsCoach(req.user),
  });
};

/**
 * Show the form to add an evalution
 */
export const showAddEvaluation = async (req, res, next) => {
  // Get input errors
  const inputErrors = req.inputErrors || {};

  // Get id (maatwerker) and type (evaluatietype) from params
  const { id, type } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(id);
  if (!maatwerker) {
    return res.redirect('/evaluatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Check if type is valid
  if (!['instroom', 'icf', 'technisch'].includes(type)) {
    return res.redirect(`/evaluatie/${maatwerker.id}`, {
      flash: { message: 'Type evaluatie niet gevonden', type: 'danger' },
    });
  }

  // Get data for 'instroom
  const inflowEvalSubjects = await InflowEvaluationSubject.query();

  // Get data for 'icf'
  const evalStages = await EvaluationStage.query();
  const icfCategories = await IcfCategory.query();
  const icfCodes = await IcfCode.query().withGraphFetched('category');
  const icfRatings = await IcfRating.query().withGraphFetched('category');

  // Get data for 'technisch'
  const machines = await Machine.query();
  const techLevels = await TechnicalLevel.query();

  // Render template
  res.render('evaluation/add', {
    navItems: NAVITEMS,
    activeNav: 'evaluatie',
    pageTitle: 'Evaluatie toevoegen',
    type,
    inputErrors,
    fase: req.query.fase,
    // Urls
    urlBtnBack: `/evaluatie/${maatwerker.id}/${
      type === 'instroom' ? 'instroom' : req.query.fase
    }`,
    urlSubmitInstroom: `/evaluatie/${maatwerker.id}/toevoegen/instroom`,
    urlSubmitIcf: `/evaluatie/${maatwerker.id}/toevoegen/icf`,
    urlSubmitTech: `/evaluatie/${maatwerker.id}/toevoegen/technisch`,
    // Data for form 'Instroom'
    inflowEvalSubjects,
    // Data for form 'ICF'
    evalStages,
    icfCategories,
    icfCodes,
    icfRatings,
    // Data for form 'Technisch'
    machines,
    techLevels,
  });
};

/**
 * Handle add evaluation
 */
export const handleAddEvaluation = async (req, res, next) => {
  // Get id (maatwerker) and type (evaluatietype) from params
  const { id: maatwerker_id, type } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerker_id);
  if (!maatwerker) {
    return res.redirect('/evaluatie', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Check if type is valid
  if (!['instroom', 'icf', 'technisch'].includes(type)) {
    return res.redirect(`/evaluatie/${maatwerker.id}`, {
      flash: { message: 'Type evaluatie niet gevonden', type: 'danger' },
    });
  }

  // Handle 'Instroom
  // ----------------
  if (type === 'instroom') {
    // Validate form
    const joiValidation = inflowEvaluationSchema.validate(req.body);
    if (joiValidation.error) {
      req.inputErrors = {};
      for (const detail of joiValidation.error.details) {
        req.inputErrors[detail.path[0]] = detail.message;
      }
      return next();
    }
    // Add evaluation
    const now = new Date();
    const newEval = {
      maatwerker_id: parseInt(maatwerker_id),
      maatwerkcoach_id: parseInt(req.user.id),
      inflow_evaluation_subject_id: parseInt(
        req.body.inflow_evaluation_subject_id
      ),
      content: req.body.content,
      comment: req.body.comment,
      created_at: now,
      updated_at: now,
    };
    await InflowEvaluation.query().insert(newEval);
    // Redirect
    return res.redirect(`/evaluatie/${maatwerker.id}/instroom`);
  }

  // Handle 'ICF'
  // ------------
  if (type === 'icf') {
    // Validate form
    const joiValidation = icfEvaluationSchema.validate(req.body);
    if (joiValidation.error) {
      req.inputErrors = {};
      for (const detail of joiValidation.error.details) {
        req.inputErrors[detail.path[0]] = detail.message;
      }
      return next();
    }
    // Add evaluation
    const now = new Date();
    const newEval = {
      maatwerker_id: parseInt(maatwerker_id),
      maatwerkcoach_id: parseInt(req.user.id),
      evaluation_stage_id: parseInt(req.body.evaluation_stage_id),
      icf_category_id: parseInt(req.body.icf_category_id),
      icf_code_id: req.body.icf_code_id,
      icf_rating_id: parseInt(req.body.icf_rating_id),
      comment: req.body.comment,
      created_at: now,
      updated_at: now,
    };
    await IcfEvaluation.query().insert(newEval);
    // Redirect
    return res.redirect(`/evaluatie/${maatwerker.id}/${req.body.fase}`);
  }

  // Handle 'Technisch'
  // ------------------
  if (type === 'technisch') {
    // Validate form
    const joiValidation = techEvaluationSchema.validate(req.body);
    if (joiValidation.error) {
      req.inputErrors = {};
      for (const detail of joiValidation.error.details) {
        req.inputErrors[detail.path[0]] = detail.message;
      }
      return next();
    }
    // Add evaluation
    const now = new Date();
    const newEval = {
      maatwerker_id: parseInt(maatwerker_id),
      maatwerkcoach_id: parseInt(req.user.id),
      evaluation_stage_id: parseInt(req.body.evaluation_stage_id),
      machine_id: parseInt(req.body.machine_id),
      technical_level_id: req.body.technical_level_id,
      comment: req.body.comment,
      created_at: now,
      updated_at: now,
    };
    await TechnicalEvaluation.query().insert(newEval);
    // Redirect
    return res.redirect(`/evaluatie/${maatwerker.id}/${req.body.fase}`);
  }
};
