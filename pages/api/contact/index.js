import sgMail from "@sendgrid/mail";

export default async function handler(req , res) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "INVALID_METHOD" });
		return;
	}
	const { name, email} = req.body;

	if ( !name || !email) {
		res.status(400).json({ message: "INVALID_PARAMETER" });
		return;
	}

	// Syntaxe adresse email
	const pattern =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!pattern.test(email)) {
		return res.status(400).send({
			message: "EMAIL_SYNTAX_INCORRECT",
		});
	}

	sgMail.setApiKey(env(SENDGRID_API_KEY));

	const sendGridMail = {
		to: email,
		from: "ogiertib@gmail.com",
		templateId: "d-d8681fcfe7af4983b41e5792e12b84fa",
		subject: 'Salle de sport',
		dynamic_template_data: {
			name: name,
			email: email,
		},
	};
	try { 
		await sgMail.send(sendGridMail)
		return res.status(200).json(true)
	} catch(e) {
		return res.status(500).json(e)
	}
}