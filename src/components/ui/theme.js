import { createMuiTheme } from '@material-ui/core/styles';

const zumenBlue = "#1890ff";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";

export default createMuiTheme({
    palette: {
        common: {
            blue: zumenBlue,
            orange: arcOrange
        },
        primary: {
            main: zumenBlue
        },
        secondary: {
            main: arcOrange
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1.5rem",
        },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "1rem",
            textTransform: "none",
            color: "white"
        },
        h2: {
            fontFamily: "Raleway",
            fontWeight: 700,
            fontSize: "2.5rem",
            color: zumenBlue,
            lineHeight: 1.5
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",
            color: zumenBlue,
        },    
        h4: {
            fontFamily: "Raleway",
            fontSize: "1.75rem",
            color: zumenBlue,
            fontWeight: 700
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: arcGrey,
        },
        subtitle2: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: "white",
        },
        learnButton: {
            borderColor: zumenBlue,
            color: zumenBlue,
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold"
        },
        body1: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: arcGrey,
        }
    }
});