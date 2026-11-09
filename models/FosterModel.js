const { FosterProfile } = require('./fosterModels'); 

async function findMatchingFosters(petSize, requiresMedical) {
  try {
    const availableFosters = await FosterProfile.find({
      
      isApproved: true,
      isAvailable: true,
      allowedSizes: petSize,

    
      ...(requiresMedical && { canHandleMedical: true }),

    
      $expr: { $lt: ['$currentActivePlacements', '$maxCapacity'] }
    });

    return availableFosters;
  } catch (error) {
    console.error('Error finding fosters:', error);
    throw error;
  }
}
