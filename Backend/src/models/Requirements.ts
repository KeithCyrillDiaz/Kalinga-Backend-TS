import mongoose from 'mongoose'


const ScreeningFormSchema = new mongoose.Schema({
    applicant_Id: {type: String, required: true},
    fullName: {type: String, required: true},
    age: {type: Number, required: true},
    birthDate: {type: String, required: true},
    email: {type: String, required: true},
    contactNumber: {type: String, required: true},
    homeAddress: {type: String, required: true},
    municipality: {type: String, required: true},
    barangay: {type: String, required: true},
    userType: {type: String, required: true},
    numberOfBabies: {type: String},

  //Infant Information
    childInformation: {type:[
      {
        name: {type: String, required: true},
        birthWeight: {type: String},
        sex: {type: String},
        birthDay: {type: String},
        age: {type: String},
        ageOfGestation: {type: String},
        medicalCondition: {type: String},
      }
  ]},


    typeOfDonor:{type: String},
    QA: {type: String},
    QB: {type: String},
    Q1: {type: String},
    Q2: {type: String},

    // Medical History
    MH1: {type: String},
    MH2: {type: String},
    MH2_Reason: {type: String},
    MH3: {type: String},
    MH4: {type: String},
    MH5: {type: String},
    MH6: {type: String},
    MH7: {type: String},
    MH8: {type: String},
    MH8_Reason: {type: String},
    MH9: {type: String},
    MH10: {type: String},
    MH11: {type: String},
    MH12: {type: String},
    MH13: {type: String},
    MH14: {type: String},
    MH14_Reason: {type: String},
    MH15: {type: String},

    //SexualHistory
    SH1: {type: String},
    SH2: {type: String},

    //Requestor
    RFR: {type: String},
    //
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    
})

export const formModel = mongoose.model("Forms", ScreeningFormSchema);
export const createForm = (values: Record<string, any>) => new formModel(values).save().then((result) => result.toObject());
export const getForms = () => formModel.find()
export const getFormById = (_id: mongoose.Types.ObjectId) => formModel.findById(_id)
export const getFormsByParameter = (parameter: any) => formModel.findOne(parameter)