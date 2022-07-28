import PropTypes from 'prop-types';
import {useAppSettings} from "../hooks/use-app-settings";

export const Logo = (props) => {
  const { emblemOnly, variant } = props;

  const color = variant === 'light' ? '#ffffff' : '#1D262D';

  const appSettings = useAppSettings();

  console.log("logo", appSettings.get_logo())


  return (
      <img src={appSettings.get_logo()} alt="" width="90px"/>
  );
};

Logo.defaultProps = {
  emblemOnly: false,
  variant: 'dark'
};

Logo.propTypes = {
  emblemOnly: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark'])
};
