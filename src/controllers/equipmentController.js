/**
 * EQUIPMENT CONTROLLER
 */

import { NAVITEMS } from '../lib/consts.js';
import { getUserIsCoach } from '../lib/utils.js';

// Import models
import EquipmentType from '../models/equipment/EquipmentType.js';
import User from '../models/User.js';
import { test } from './mailController.js';

/**
 * Index
 */
export const index = async (req, res) => {
  // Maatwerker: redirect to show page
  if (req.user.role.id === 2) {
    return res.redirect(`/kledij-en-materiaal/${req.user.id}`);
  }

  // Get flash messages
  const flash = req.flash('flash')[0] || {};

  // Get maatwerkers (for select element)
  const maatwerkers = await User.query()
    .select('id', 'firstname', 'lastname')
    .where('role_id', 2);

  // Render template
  res.render('equipment/index', {
    navItems: NAVITEMS,
    activeNav: 'kledij-en-materiaal',
    pageTitle: 'Kledij en materiaal',
    maatwerkers,
  });
};

/**
 * Show equipments
 */
export const showEquipments = async (req, res) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Authorization
  if (
    req.user.role.id === 2 &&
    parseInt(maatwerkerId) !== parseInt(req.user.id)
  ) {
    return res.redirect('/', {
      flash: { message: 'Onvoldoende rechten', type: 'danger' },
    });
  }

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/afspraken', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get equipment types
  const equipmentTypes = await EquipmentType.query();

  // Get equipments for current maatwerker
  const equipments = await User.relatedQuery('equipment').for(maatwerkerId);
  const inPosssessionOfIds = equipments.map((e) => e.equipment_type_id);

  // Render template
  res.render('equipment/show', {
    navItems: NAVITEMS,
    activeNav: 'kledij-en-materiaal',
    pageTitle: `Kledij en materiaal van ${maatwerker.firstname} ${maatwerker.lastname}`,
    equipmentTypes,
    equipments,
    inPosssessionOfIds,
    isCoach: getUserIsCoach(req.user),
    urlEdit: `/kledij-en-materiaal/${maatwerkerId}/bewerken`,
    urlCancel: `/kledij-en-materiaal/${maatwerkerId}`,
  });
};

/**
 * Show page to edit equipments
 */
export const showEditEquipments = async (req, res) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/kledij-en-materiaal', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // Get equipment types
  const equipmentTypes = await EquipmentType.query();

  // Get equipments for current maatwerker
  const equipments = await User.relatedQuery('equipment').for(maatwerkerId);
  const inPosssessionOfIds = equipments.map((e) => e.equipment_type_id);

  // Render template
  res.render('equipment/edit', {
    navItems: NAVITEMS,
    activeNav: 'kledij-en-materiaal',
    pageTitle: `Kledij en materiaal van ${maatwerker.firstname} ${maatwerker.lastname}`,
    equipmentTypes,
    equipments,
    inPosssessionOfIds,
    urlBtnBack: `/kledij-en-materiaal/${maatwerkerId}`,
    urlSubmit: `/kledij-en-materiaal/${maatwerker.id}/bewerken`,
  });
};

/**
 * Handle update of equipment
 */
export const handleUpdateEquipments = async (req, res, next) => {
  // Get id (maatwerker) from params
  const { maatwerkerId } = req.params;

  // Get maatwerker
  const maatwerker = await User.query().findById(maatwerkerId);
  if (!maatwerker) {
    return res.redirect('/kledij-en-materiaal', {
      flash: { message: 'Maatwerker niet gevonden', type: 'danger' },
    });
  }

  // First delete all equipments for current maatwerker
  await User.relatedQuery('equipment').for(maatwerkerId).delete();

  // Update equipmments
  const equipmentTypes = await EquipmentType.query();
  for (const type of equipmentTypes) {
    if (req.body[type.slug]) {
      const newEquipment = {
        maatwerker_id: parseInt(maatwerkerId),
        equipment_type_id: parseInt(type.id),
      };
      if (req.body[`date-${type.slug}`]) {
        newEquipment.created_at = parseInt(req.body[`date-${type.slug}`]);
      } else {
        newEquipment.created_at = new Date();
      }
      await User.relatedQuery('equipment')
        .for(maatwerkerId)
        .insert(newEquipment);
    }
  }

  // Redirect
  return res.redirect(`/kledij-en-materiaal/${maatwerkerId}`);
};
