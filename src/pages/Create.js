import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
});

export default function Create() {
	const classes = useStyles();

	const history = useHistory();

	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");

	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);

	const [category, setCategory] = useState("money");

	const handleSubmit = e => {
		e.preventDefault();

		if (title === "") {
			setTitleError(true);
		}
		if (details === "") {
			setDetailsError(true);
		}

		if (title && details) {
			fetch("http://localhost:8000/notes", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, category, details })
			}).then(() => history.push('/'))
		}
	};

	return (
		<Container>
			<Typography
				color="textSecondary"
				variant="h6"
				component="h2"
				gutterBottom
			>
				Create a New Note
			</Typography>

			<form onSubmit={handleSubmit} noValidate autoComplete="off">
				<TextField
					onChange={e => {
            setTitleError(false)
						setTitle(e.target.value);
					}}
					className={classes.field}
					label="Note Title"
					color="secondary"
					variant="outlined"
					required
					fullWidth
					error={titleError}
				/>
				<TextField 
					onChange={e => {
            setDetails(e.target.value)
            setDetailsError(false)
          }}
					className={classes.field}
					label="Details"
					multiline
					minRows={4}
					fullWidth
					color="secondary"
					variant="outlined"
					required
					error={detailsError}
				/>

				<FormControl className={classes.field}>
					<FormLabel color="secondary">
						Note Category
					</FormLabel>

					<RadioGroup value={category} onChange={ (e) => setCategory(e.target.value) }>
						<FormControlLabel control={<Radio />} label="Money" value="money" />
						<FormControlLabel control={<Radio />} label="Todos" value="todos" />
						<FormControlLabel control={<Radio />} label="Reminders" value="reminders" />
						<FormControlLabel control={<Radio />} label="Work" value="work" />
					</RadioGroup>
				</FormControl>



				<Button
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<KeyboardArrowRightIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}
