
const cors = require('cors');
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "public/files" });
const path = require("path");
const { resourceLimits } = require('worker_threads');
const { error } = require('console');

mongoose.connect("mongodb+srv://glenmuga:abc12345@cluster0.fkeedgl.mongodb.net/?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
).then(() => { console.log("mongodb connected") });


const PolicySchema = new mongoose.Schema({
	PolicyId: { type: String, required: true },
	PolicyAddress: { type: String, required: true },
	AadharNumber: { type: String, required: true },
	PolicyAmount: { type: String, required: true },
	PolicyName: { type: String, required: true },
	DocumentAddress: { type: String, required: true },
});
const UserSchema = new mongoose.Schema({
	VerifierName: { type: String, required: true },
	VerifierCompany: { type: String, required: true },
	VerifierDesignation: { type: String, required: true },
	VerifierAccountAddress: { type: String, required: true },
	Password: { type: String, required: true },
});

const Policy = mongoose.model("Policy", PolicySchema);
const Account = mongoose.model("account", UserSchema);
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
	extended: true
}));

app.set("views", path.join(__dirname, 'views'));

app.use(express.static(`${__dirname}/public`));

app.get("/contact", function (req, res) {
	res.render("contact");
});

app.post("/api/uploadFile", upload.single("MyFile"), (req, res) => {
	// Stuff to be added later
	console.log(req.file)
	let file_path = req.file.path;
	res.json({ message: "Successfully uploaded files", path: file_path })
});

app.get("/downloadFile", (req, res) => {
	// Stuff to be added later
	try {
		console.log(req.query.filename)
		var filePath = path.resolve(req.query.filename);
		console.log(filePath)
		res.download(filePath)
		
		// var stat = fileSystem.statSync(filePath);
		// var filename = path.basename(filePath);
		// var mimetype = mime.getExtension(filePath);
	
		// res.setHeader("Content-disposition", "attachment; filename=" + filename);
		// res.setHeader("Content-type", mimetype);
	
		// res.writeHead(200, {
		//   "Content-Length": stat.size,
		// });
	
		// var readStream = fileSystem.createReadStream(filePath);
		// // We replaced all the event handlers with a simple call to readStream.pipe()
		// readStream.pipe(res);
		// logger.info("download >> Response >> ", res);
	  } catch (error) {
		logger.error("Exception: download >> ", error);
		res.json({
		  response: error,
		  status: {
			code: "02",
			status: "failure",
			message: "Error occured in react",
		  },
		});
	  }
	
});

app.post("/submitForm", async function (req, res) {
	console.log(req.body.data.VerifierDesignation)
	const newAccount = await Account.create({
		VerifierName: req.body.data.VerifierName,
		VerifierCompany: req.body.data.VerifierCompany,
		VerifierDesignation: req.body.data.VerifierDesignation,
		VerifierAccountAddress: req.body.data.VerifierAccountAddress,
		Password: req.body.data.Password,
	})
	if(newAccount){
		res.send(newAccount)
	}
	console.log(newAccount)
});


app.post("/Regform", async function (req, res) {
	console.log(req.body)
	const newPolicy = await Policy.create({
		PolicyId: req.body.data.policyId,
		PolicyAddress: req.body.data.policyAddress,
		AadharNumber: req.body.data.aadharNumber,
		PolicyAmount: req.body.data.policyAmount,
		PolicyName: req.body.data.policyName,
		DocumentAddress: req.body.data.documentAddress
	})

	// console.log(newPolicy)
});
app.post("/handle-login", (req, res) => {
	console.log(req.body)
	Account.findOne({VerifierName:req.body.data.VerifierName})
		.then((docs) => {
			console.log("Result :", docs);
			res.send(docs)
		})
		.catch((err) => {
			res.send({mssg:"user not found"})
			console.log(err);
		});

})
app.get("/get-policies", (req, res) => {
	console.log(req.body)
	Policy.find({})
		.then((docs) => {
			console.log("Result :", docs);
			res.send(docs)
		})
		.catch((err) => {
			res.send({mssg:"user not found"})
			console.log(err);
		});
	})		
app.listen(4040, function () {
	console.log("App is running on Port 4040");
});
