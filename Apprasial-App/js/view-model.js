//Mapping Way
var data = {
	subjectPropertyAddress: '',//Normal TextArea or input type="text" or date example -- subjectPropertyAddress: '123 Address'
	subjectStateSelected: ['Select'],//Normal dropdown example -- subjectStateSelected: ['CT']
	subjectCity: '',
	subjectZip: '',
	subjectCounty: '',
	subjectBorrower: '',
	subjectOwnerOfPublicRecord: '',
	subjectLegalDescription: '',
	subjectAssessorsParcel: '',
	subjectTaxYearSelected: ['Select'],
	subjectReTaxes: '',
	subjectNeighborhoodName: '',
	subjectMapReference: '',
	subjectCensusTract: '',
	subjectOccupantSelected: ['Select'],
	subjectSpecialAssessments: '',
	subjectPudHoa: '',
	subjectPudHoaFrequencySelected: ['Select'],
	subjectPropertyRightsAppraisedSelected: ['Select'],
	subjectPropertyRightsAppraisedOther: '',
	subjectAssignmentTypeSelected: ['Select'],
	subjectAssignmentTypeOther: '',
	subjectLenderClient: '',
	subjectAddress: '',
	subjectCurrentlyOfferedSelected: ['Select'],
	subjectDataSourceOfferedPrice: '',
	subjectUnitNum: '',
	subjectContractPrice: '',
	subjectDateOfContract: '',
	subjectPropertyRightsAppraised: ['Select'],
	subjectPropertyRightsAppraisedOther: '',
	subjectOriginalAppraisedValue: '',
	subjectOriginalAppraiser: '',
	subjectCompanyName: '',
	subjectOriginalLenderClient: '',
	subjectAddress: '',
	
	contractAnalyzeContractChecked: '',
	contractAnalyzeExplain: '',
	contractPrice: '',
	contractDate: '',//Date example -- contractDate: '2013-11-21'
	contractPropertySellerChecked: '',
	contractDataSources: '',
	contractFinancialAssistanceChecked: '',
	contractFinancialAssistanceYes: '',
	contractManufacturerChecked: '',
	contractManufacturerExplain: '',
	contractRetailerName: '',
	
	neighborhoodLocationSelected: '',
	neighborhoodBuiltUpSelected: '',
	neighborhoodGrowthSelected: '',
	neighborhoodPropertyValuesSelected: '',
	neighborhoodDemandSupplySelected: '',
	neighborhoodMarketingSelected: '',
	neighborhoodPrice: '',
	neighborhoodAge: '',
	neighborhoodPriceSelected: '',
	neighborhoodOneUnit: '',
	neighborhoodTwoToFour: '',
	neighborhoodMultiFamily: '',
	neighborhoodCommercial: '',
	neighborhoodOther: '',
	neighborhoodDescription: '',
	neighborhoodConditions: '',
	
	siteDimensions: '',
	siteArea: '',
	siteShape: '',
	siteView: '',
	siteZoning: '',
	siteZoningDescription: '',
	siteZoningComplianceSelected: '',
	siteZoningComplianceOther: '',
	sitePropertyImprovedSelected: '',
	sitePropertyImprovedOther: '',
	siteElectricitySelected: '',
	siteGasSelected: '',
	siteWaterSelected: '',
	siteSanitarySewerSelected: '',
	siteStreetSelected: '',
	siteAlleySelected: '',
	siteFloodHazardSelected: '',
	siteFemaFloodZone: '',
	siteFemaMap: '',
	siteFemaMapDate: '',
	siteTypicalSelected: '',
	siteTypicalSelectedNo: '',
	siteAdverseSelected: '',
	siteAdverseSelectedOther: '',
	siteAdequateVehicularAccessSelected: '',
	siteAdequateVehicularAccessNo: '',
	siteStreetMaintainedSelected: '',
	siteStreetMaintainedNo: '',

	improvementsUnitsSelected: ['Select'],
	improvementsNumOfStories: '',
	improvementsTypeSelected: ['Select'],
	improvementsDesignStyle: '',
	improvementsYearBuilt: '',
	improvementsEffectiveAgeYears: '',
	improvementsFoundationChecked: '',//Radio Button Example -- improvementsFoundationChecked: 'Something' (In the radio group, "Something" is selected)
	improvementsBasementArea: '',
	improvementsBasementFinish: '',
	improvementsSumpPumpChecked: [],//Checkbox Example -- improvementsSumpPumpChecked: ['Something1','Something3'] (In the checkbox group, 1 and 3 are selected)
	improvementsEvidenceOfSelected: ['Select'],
	improvementsFoundationWalls: '',
	improvementsExteriorWalls: '',
	improvementsRoofSurface: '',
	improvementsGuttersAndDownspouts: '',
	improvementsWindowType: '',
	improvementsStormSash: '',
	improvementsScreens: '',
	improvementsFloors: '',
	improvementsWalls: '',
	improvementsTrimFinish: '',
	improvementsBathFloor: '',
	improvementsBathWainscot: '',
	improvementsAtticSelected: ['Select'],
	improvementsHeatingSelected: ['Select'],
	improvementsFuel: '',
	improvementsCoolingSelected: ['Select'],
	improvementsAmenitiesSelected: ['Select'],
	improvementsCarStorageSelected: ['Select'],
	improvementsNumCars: '',
	improvementsDrivewaySurfaceSelected: ['Select'],
	improvementsAppliancesChecked:[],
	improvementsAppliancesOther: '',
	improvementsRooms: '',
	improvementsBedrooms: '',
	improvementsBaths: '',
	improvementsSqFtGrossLivingArea: '',
	improvementsAdditionalFeatures: '',
	improvementsPropertyCondition: '',
	improvementsPhysicalDeficienciesSelected: ['Select'],
	improvementsPhysicalDeficienciesOther: '',
	improvementsConformToNeighborhoodSelected: ['Select'],
	improvementsConformToNeighborhoodOther: '',
	improvementsUnits1004cSelected: ['Select'],
	improvementsNumOfSections: '',
	improvementsSkirting: '',
	improvementsDoors: '',
	improvementsAdditionalModifications: '',
	improvementsInstallersName: '',
	improvementsDateInstalled: '',
	improvementsModelYear: '',
	improvementsPermanentFoundationSelected: ['Select'],
	improvementsPermanentFoundationNo: '',
	improvementsHitchRemovedSelected: ['Select'],
	improvementsHitchRemovedNo: '',
	improvementsPermanentSewageSelected: ['Select'],
	improvementsPermanentSewageNo: '',
	improvementsSufficientDwellingSelected: ['Select'],
	improvementsSufficientDwellingNo: '',
	improvementsMhQualitySelected: ['Select'],
	improvementsMhQualitySource: '',
	improvements1025UnitsSelected: ['Select'],
	improvementsNumOfBuildings: '',
	improvementsRefrigeratorNum: '',
	improvementsRangeNum: '',
	improvementsDishwasherNum: '',
	improvementsDisposalNum: '',
	improvementsMicrowaveNum: '',
	improvementsWasherDryerNum: '',
	improvementsOtherNum: '',
	improvementsUnitOneRooms: '',
	improvementsUnitOneBedrooms: '',
	improvementsUnitOneBaths: '',
	improvementsUnitOneGrossLivingArea: '',
	improvementsUnitTwoRooms: '',
	improvementsUnitTwoBedrooms: '',
	improvementsUnitTwoBaths: '',
	improvementsUnitTwoGrossLivingArea: '',
	improvementsUnitThreeRooms: '',
	improvementsUnitThreeBedrooms: '',
	improvementsUnitThreeBaths: '',
	improvementsUnitThreeGrossLivingArea: '',
	improvementsUnitFourRooms: '',
	improvementsUnitFourBedrooms: '',
	improvementsUnitFourBaths: '',
	improvementsUnitFourGrossLivingArea: '',
	improvementsSubjectToRentControlSelected: ['Select'],
	improvementsSubjectToRentControlYes: '',
	
	scaComparableCount: '',
	scaComparableFromPrice: '',
	scaComparableToPrice: '',
	scaComparableSaleCount: '',
	scaComparableSaleFromPrice: '',
	scaComparableSaleToPrice: '',
	//Subject
	scaSubjectAddress: '',
	scaSubjectSalePrice: '',
	scaSubjectGrossPrice: '',
	scaSubjectLocation: '',
	scaSubjectLeasehold: '',
	scaSubjectSite: '',
	scaSubjectView: '',
	scaSubjectDesignStyle: '',
	scaSubjectQualityOfConstruction: '',
	scaSubjectActualAge: '',
	scaSubjectCondition: '',
	scaSubjectTotalRooms: '',
	scaSubjectBedrooms: '',
	scaSubjectBaths: '',
	scaSubjectGrossLivingArea: '',
	scaSubjectRoomsBelowGrade: '',
	scaSubjectFunctionalUtility: '',
	scaSubjectHeatingCooling: '',
	scaSubjectEnergyEfficientItems: '',
	scaSubjectGarageCarport: '',
	scaSubjectGarageCarport: '',
	scaSubjectPorch: '',
	scaSubjectGrossMonthlyRent: '',
	scaSubjectGrossRentMultiplier: '',
	scaSubjectPricePerUnit: '',
	scaSubjectPricePerRoom: '', 
	scaSubjectPricePerBedroom: '',
	scaRentControlChecked: '',
	scaSubjectGrossBuildingArea: '',
	scaSubjectUnitOneTotalRooms: '',
	scaSubjectUnitOneTotalBedrooms: '',
	scaSubjectUnitOneTotalBaths: '',
	scaSubjectUnitTwoTotalRooms: '',
	scaSubjectUnitTwoTotalBedrooms: '',
	scaSubjectUnitTwoTotalBaths: '',
	scaSubjectUnitThreeTotalRooms: '',
	scaSubjectUnitThreeTotalBedrooms: '',
	scaSubjectUnitThreeTotalBaths: '',
	scaSubjectUnitFourTotalRooms: '',
	scaSubjectUnitFourTotalBedrooms: '',
	scaSubjectUnitFourTotalBaths: '',
	scaSubjectBasementDescription: '',
	scaSubjectBasementFinishedRooms: '',
	scaSubjectParkingOnOff: '',
	//Comparable 1
	scaCompOneAddress: '',
	scaCompOneProximity: '',
	scaCompOneSalePrice: '',
	scaCompOneGrossPrice: '',
	scaCompOneDataSources: '',
	scaCompOneVerificationSources: '',
	scaCompOneConcessions: '',
	scaCompOneConcessionsAdjustment: '',
	scaCompOneDateOfSale: '',
	scaCompOneDateOfSaleAdjustment: '',
	scaCompOneLocation: '',
	scaCompOneLocationAdjustment: '',
	scaCompOneLeasehold: '',
	scaCompOneLeaseholdAdjustment: '',
	scaCompOneSite: '',
	scaCompOneSiteAdjustment: '',
	scaCompOneView: '',
	scaCompOneViewAdjustment: '',
	scaCompOneDesignStyle: '',
	scaCompOneDesignStyleAdjustment: '',
	scaCompOneQuality: '',
	scaCompOneQualityAdjustment: '',
	scaCompOneActualAge: '',
	scaCompOneActualAgeAdjustment: '',
	scaCompOneCondition: '',
	scaCompOneConditionAdjustment: '',
	scaCompOneTotalRooms: '',
	scaCompOneBedrooms: '',
	scaCompOneBaths: '',
	scaCompOneGrossLivingArea: '',
	scaCompOneGrossLivingAreaAdjustment: '',
	scaCompOneRoomsBelowGrade: '',
	scaCompOneRoomsBelowGradeAdjustment: '',
	scaCompOneFunctionalUtility: '',
	scaCompOneFunctionalUtilityAdjustment: '',
	scaCompOneHeatingCooling: '',
	scaCompOneHeatingCoolingAdjustment: '',
	scaCompOneEnergyItems: '',
	scaCompOneEnergyItemsAdjustment: '',
	scaCompOneGarage: '',
	scaCompOneGarageAdjustment: '',
	scaCompOnePorch: '',
	scaCompOnePorchAdjustment: '',
	scaCompOneNetAdjustmentChecked: '',
	scaCompOneNetAdjustment: '',
	scaCompOneNetAdjustmentPercent: '',
	scaCompOneGrossAdjustmentPercent: '',
	scaCompOneDollarAdjustment: '',
	//Comparable 2
	scaCompTwoAddress: '',
	scaCompTwoProximity: '',
	scaCompTwoSalePrice: '',
	scaCompTwoGrossPrice: '',
	scaCompTwoDataSources: '',
	scaCompTwoVerificationSources: '',
	scaCompTwoConcessions: '',
	scaCompTwoConcessionsAdjustment: '',
	scaCompTwoDateOfSale: '',
	scaCompTwoDateOfSaleAdjustment: '',
	scaCompTwoLocation: '',
	scaCompTwoLocationAdjustment: '',
	scaCompTwoLeasehold: '',
	scaCompTwoLeaseholdAdjustment: '',
	scaCompTwoSite: '',
	scaCompTwoSiteAdjustment: '',
	scaCompTwoView: '',
	scaCompTwoViewAdjustment: '',
	scaCompTwoDesignStyle: '',
	scaCompTwoDesignStyleAdjustment: '',
	scaCompTwoQuality: '',
	scaCompTwoQualityAdjustment: '',
	scaCompTwoActualAge: '',
	scaCompTwoActualAgeAdjustment: '',
	scaCompTwoCondition: '',
	scaCompTwoConditionAdjustment: '',
	scaCompTwoTotalRooms: '',
	scaCompTwoBedrooms: '',
	scaCompTwoBaths: '',
	scaCompTwoGrossLivingArea: '',
	scaCompTwoGrossLivingAreaAdjustment: '',
	scaCompTwoRoomsBelowGrade: '',
	scaCompTwoRoomsBelowGradeAdjustment: '',
	scaCompTwoFunctionalUtility: '',
	scaCompTwoFunctionalUtilityAdjustment: '',
	scaCompTwoHeatingCooling: '',
	scaCompTwoHeatingCoolingAdjustment: '',
	scaCompTwoEnergyItems: '',
	scaCompTwoEnergyItemsAdjustment: '',
	scaCompTwoGarage: '',
	scaCompTwoGarageAdjustment: '',
	scaCompTwoPorch: '',
	scaCompTwoPorchAdjustment: '',
	scaCompTwoNetAdjustmentChecked: '',
	scaCompTwoNetAdjustment: '',
	scaCompTwoNetAdjustmentPercent: '',
	scaCompTwoGrossAdjustmentPercent: '',
	scaCompTwoDollarAdjustment: '',
	//Comparable 3
	scaCompThreeAddress: '',
	scaCompThreeProximity: '',
	scaCompThreeSalePrice: '',
	scaCompThreeGrossPrice: '',
	scaCompThreeDataSources: '',
	scaCompThreeVerificationSources: '',
	scaCompThreeConcessions: '',
	scaCompThreeConcessionsAdjustment: '',
	scaCompThreeDateOfSale: '',
	scaCompThreeDateOfSaleAdjustment: '',
	scaCompThreeLocation: '',
	scaCompThreeLocationAdjustment: '',
	scaCompThreeLeasehold: '',
	scaCompThreeLeaseholdAdjustment: '',
	scaCompThreeSite: '',
	scaCompThreeSiteAdjustment: '',
	scaCompThreeView: '',
	scaCompThreeViewAdjustment: '',
	scaCompThreeDesignStyle: '',
	scaCompThreeDesignStyleAdjustment: '',
	scaCompThreeQuality: '',
	scaCompThreeQualityAdjustment: '',
	scaCompThreeActualAge: '',
	scaCompThreeActualAgeAdjustment: '',
	scaCompThreeCondition: '',
	scaCompThreeConditionAdjustment: '',
	scaCompThreeTotalRooms: '',
	scaCompThreeBedrooms: '',
	scaCompThreeBaths: '',
	scaCompThreeGrossLivingArea: '',
	scaCompThreeGrossLivingAreaAdjustment: '',
	scaCompThreeRoomsBelowGrade: '',
	scaCompThreeRoomsBelowGradeAdjustment: '',
	scaCompThreeFunctionalUtility: '',
	scaCompThreeFunctionalUtilityAdjustment: '',
	scaCompThreeHeatingCooling: '',
	scaCompThreeHeatingCoolingAdjustment: '',
	scaCompThreeEnergyItems: '',
	scaCompThreeEnergyItemsAdjustment: '',
	scaCompThreeGarage: '',
	scaCompThreeGarageAdjustment: '',
	scaCompThreePorch: '',
	scaCompThreePorchAdjustment: '',
	scaCompThreeNetAdjustmentChecked: '',
	scaCompThreeNetAdjustment: '',
	scaCompThreeNetAdjustmentPercent: '',
	scaCompThreeGrossAdjustmentPercent: '',
	scaCompThreeDollarAdjustment: '',
	//Research and Data
	scaRndResearchDataChecked: '',
	scaRndResearchDataNot: '',
	scaRndMyResearchChecked: '',
	scaRndMyResearchDataSources: '',
	scaRndMyResearchComparableChecked: '',
	scaRndMyResearchComparableDataSources: '',
	scaRndSubjectDateOfPriorSale: '',
	scaRndCompOneDateOfPriorSale: '',
	scaRndCompTwoDateOfPriorSale: '',
	scaRndCompThreeDateOfPriorSale: '',
	scaRndSubjectPriceOfPriorSale: '',
	scaRndCompOnePriceOfPriorSale: '',
	scaRndCompTwoPriceOfPriorSale: '',
	scaRndCompThreePriceOfPriorSale: '',
	scaRndSubjectDataSources: '',
	scaRndCompOneDataSources: '',
	scaRndCompTwoDataSources: '',
	scaRndCompThreeDataSources: '',
	scaRndSubjectEffectiveDate: '',
	scaRndCompOneEffectiveDate: '',
	scaRndCompTwoEffectiveDate: '',
	scaRndCompThreeEffectiveDate: '',
	scaRndSubjectComparableAnalysis: '',
	scaRndSubjectComparableSummary: '',
	
	reconSalesCompApproach: '',
	reconCostApproach: '',
	reconIncomeApproach: '',
	reconApprasialStatusChecked: '',
	reconMarketValue: '',
	reconDateOfInspection: '',
	
	caSupportText: '',
	caEstimatedChecked: '',
	caSourceOfDataCost: '',
	caQualityRating: '',
	caEffectiveDate: '',
	caCommentsOnApproach: '',
	caEstimatedEconomicLife: '',
	caOpinionOfSiteValue: '',
	caDwellingOneSqFt: '',
	caDwellingOneCostPerSqFt: '',
	caDwellingOneTotalCost: '',
	caDwellingTwoSqFt: '',
	caDwellingTwoCostPerSqFt: '',
	caDwellingTwoTotalCost: '',
	caGarageSqFt: '',
	caGarageCostPerSqFt: '',
	caGarageTotalCost: '',
	caTotalEstimatedCostNew: '',
	caDepPhysical: '',
	caDepFunctional: '',
	caDepExternal: '',
	caDepTotal: '',
	caDepCostOfImprovements: '',
	caAsIsValue: '',
	caIndicatedValueByCa: '',
	caSectionOneArea: '',
	caSectionOnePricePer: '',
	caSectionOneTotal: '',
	caSectionTwoArea: '',
	caSectionTwoPricePer: '',
	caSectionTwoTotal: '',
	caSectionThreeArea: '',
	caSectionThreePricePer: '',
	caSectionThreeTotal: '',
	caSectionFourArea: '',
	caSectionFourPricePer: '',
	caSectionFourTotal: '',
	caSubtotal: '',
	caCostMultiplier: '',
	caModifiedSubtotal: '',
	caPhysDepModifier: '',
	caFunctionalObsolescence: '',
	caExternalDep: '',
	caDelivery: '',
	caOtherDep: '',
	caSubjectMarketValue: '',
	caIndicatedValue: '',
	caSectionOneLength: '',
	caSectionOneWidth: '',
	caSectionOneTotalArea: '',
	caSectionTwoLength: '',
	caSectionTwoWidth: '',
	caSectionTwoTotalArea: '',
	caSectionThreeLength: '',
	caSectionThreeWidth: '',
	caSectionThreeTotalArea: '',
	caSectionFourLength: '',
	caSectionFourWidth: '',
	caSectionFourTotalArea: '',
	caTotalGrossLivingArea: '',
	caNadaMonth: '',
	caNadaYear: '',
	caNadaMhState: '',
	caNadaRegion: '',
	caNadaLength: '',
	caNadaWidth: '',
	caGrayPg: '',
	caWhitePg: '',
	caBlackPg: '',
	caYellowPg: '',
	caFifteenYearsPg: '',
	caEstimatedRemainingEconomicLife: '',
	caOtherComments: '',
	caSummaryOfCa: '',
	
	incomeEstimatedMonthlyMarketRent: '',
	incomeGrossRentMultiplier: '',
	incomeIndicatedValueByIa: '',
	incomeSummaryOfIa: '',
	
	pudHomeownersAssSelected: ['Select'],
	pudUnitTypesSelected: ['Select'],
	pudLegalProjectName: '',
	pudTotalNumOfPhases: '',
	pudTotalNumOfUnits: '',
	pudTotalNumOfUnitsSold: '',
	pudTotalNumOfUnitsRented: '',
	pudTotalNumOfUnitsForSale: '',
	pudDataSources: '',
	pudConversionSelected: ['Select'],
	pudConversionDate: '',
	pudConversionDataSources: '',
	pudMultiDwellingSelected: ['Select'],
	pudMultiDwellingDataSources: '',
	pudFacilitiesCompleteSelected: ['Select'],
	pudFacilitiesCompleteNo: '',
	pudLeasedToHaSelected: ['Select'],
	pudLeasedToHaYes: '',
	pudDescribeCommon: '',
	
	//Appraiser
	appraiserSignature: '',//This is a data URL
	appraiserName: '',
	appraiserCompanyName: '',
	appraiserCompanyAddress: '',
	appraiserTelephoneNumber: '',
	appraiserEmail: '',
	appraiserDateOfSig: '',
	appraiserEffectiveDate: '',
	appraiserStateCertNum: '',
	appraiserStateLicNum: '',
	appraiserOther: '',
	appraiserStateNum: '',
	appraiserState: '',
	appraiserCertExpirationDate: '',
	appraiserAppraisedValue: '',
	appraiserPropertyAddress: '',
	//Lender/Client
	appraiserLcName: '',
	appraiserLcCompanyName: '',
	appraiserLcEmail: '',
	appraiserLcCompanyAddress: '',
	//SupervisoryAppraiser
	appraiserSaSignature: '',
	appraiserSaName: '',
	appraiserSaCompanyName: '',
	appraiserSaCompanyAddress: '',
	appraiserSaTelephoneNumber: '',
	appraiserSaEmail: '',
	appraiserSaSignatureDate: '',
	appraiserSaStateCertNum: '',
	appraiserSaStateLicNum: '',
	appraiserSaState: '',
	appraiserSaCertExpirationDate: '',
	appraiserSaSubjectPropertyChecked: '',
	appraiserSaSubjectPropertyDate: '',
	appraiserSaCompSalesChecked: '',
	appraiserSaCompSalesDate: '',
	signaturesDateOfInspection: '',
	
	hdpCertificateSelected: ['Select'],
	hdpCertificateDetails: '',
	hdpCertificateLabelSelected: ['Select'],
	hdpCertificateLabelNo: '',
	hdpVin: '',
	hdpCertificateLabelNum: '',
	hdpManufacturerName: '',
	hdpTradeModel: '',
	hdpDateOfManufacture: '',
	hdpMinHudRequirementsSelected: ['Select'],
	hdpMinHudRequirementsNo: '',
	
	saurMarketValueDeclinedChecked: '',
	saurMarketValueDeclinedDetails: '',
	
	cocAccordanceChecked: '',
	cocAccordanceNo: '',
	
	//Comments Timeline 
	notesComments: [{name:'steve', dateTime:'yesterday', commentText:'Comments'}],
	notesAddComment: function(a, b, c){
		this.notesComments.unshift({name: a, dateTime: b, commentText: c});
		alternateComments();
		$('#new-comment').val('');
	},
};

var viewModel;
var emptyViewModel = ko.mapping.fromJS(data);//create the viewModel object from the JavaScript object

//Print the current viewModel object
function getUpdatedViewModel()
{
	console.log(ko.mapping.toJS(viewModel));
}

//Remove and Add bindings on load to each node
function reapplyBindings()
{
	$("*[data-bind]").each(function(){
		$(this).unbind();
		ko.cleanNode($(this));
		ko.applyBindings(viewModel, this);
	});
	
	//Add dropdownGrey() function to all drop down lists on page initialization
	$('select').each(function(i, element){
	  dropdownGrey($(this).attr('id'));//initial run
	  $(this).change(function(){//add onchange function
		dropdownGrey($(this).attr('id'))
	  });
	});
	
	//Make date grey when not filled
	$('input[type="date"]').each(function(i, element){
	  dateGrey($(this).attr('id'));//initial run
	  $(this).change(function(){//add onchange function
		dateGrey($(this).attr('id'))
	  });
	});
	
	alternateComments();
}

function alternateComments()
{
	$('.direction-l').each(function(i, element){
			$(this).removeClass('direction-l')
			$(this).addClass('direction-r')
		});
		$('.direction-r').filter(':odd').each(function(i, element){
			$(this).removeClass('direction-r')
			$(this).addClass('direction-l')
		});
}

function saveAsJSON()
{
	console.log(ko.mapping.toJSON(viewModel));
}
function resetViewModel()
{
	return ko.mapping.fromJS(data);
}