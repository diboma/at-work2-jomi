/**
 * TECHNICAL SHEETS CONTROLLER
 */

// Markdown
import fs from 'fs';
import { marked } from 'marked';

// Import consts
import { NAVITEMS, SOURCE_PATH } from '../lib/consts.js';

// Import models
import Machine from '../models/evaluation/Machine.js';

/**
 * Index
 */
export const index = async (req, res) => {
  // Get flash messages
  const flash = req.flash || {};

  // Get machines
  const machines = await Machine.query().select('name', 'slug').orderBy('slug');

  // Render template
  res.render('tech-sheets/index', {
    navItems: NAVITEMS,
    activeNav: 'technische-fiches',
    pageTitle: 'Technische fiches',
    machines,
    flash,
  });
};

/**
 * Show
 */
export const show = async (req, res, next) => {
  // Get slug
  const { slug } = req.params;

  // Get technical sheet
  const filePath = `${SOURCE_PATH}/data/technische-fiches/${slug}.md`;
  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    req.flash = {
      type: 'danger',
      message: 'Fiche niet gevonden',
    };
    return next();
  }

  const techSheet = fs
    .readFileSync(`${SOURCE_PATH}/data/technische-fiches/${slug}.md`)
    .toString();

  // Render template
  res.render('tech-sheets/show', {
    navItems: NAVITEMS,
    activeNav: 'technische-fiches',
    pageTitle: 'Technische fiches',
    techSheet: marked.parse(techSheet),
    noFooter: true,
  });
};
