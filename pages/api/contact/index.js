import sgMail from "@sendgrid/mail";

export default function handler(req , res) {
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
		res.status(400).send({
			message: "EMAIL_SYNTAX_INCORRECT",
		});
		return;
	}

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const sendGridMail = {
		to: "ogier9@gmail.com",
		from: "ogier9@gmail.com",
		templateId: "d-d8681fcfe7af4983b41e5792e12b84fa",
		dynamic_template_data: {
			name: name,
			email: email,
		},
	};
	// SendGrid
	(async () => {
		try {
			await sgMail.send(sendGridMail);
			res.status(200).json({
				message: "EMAIL_SENDED_SUCCESSFULLY",
			});
		} catch {
			res.status(500).json({
				message: "ERROR_WITH_SENDGRID",
			});
			return;
		}
	})();
}