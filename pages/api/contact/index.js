import sgMail from "@sendgrid/mail";

export default function handler(req , res) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "INVALID_METHOD" });
		return;
	}

	// Variables
	const { nom, email, text } = req.body;

	if ( !nom || !email || !text) {
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

	const message = text
		.replace(/\n/g, "<br>")
		.replace(/\r/g, "<br>")
		.replace(/\t/g, "<br>")
		.replace(/<(?!br\s*\/?)[^>]+>/g, ""); 

	
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const sendGridMail = {
		to: email,
		from: "ogier9@gmail.com",
		templateId: "d-855e7d65d70540849616b79c187fb571",
		dynamic_template_data: {
			nom: nom,
			email: email,
			text: message,
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