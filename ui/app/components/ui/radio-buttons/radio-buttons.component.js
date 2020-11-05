import React from 'react'
import PropTypes from 'prop-types'

class RadioButtons extends React.Component {

  static contextTypes = {
    t: PropTypes.func,
    metricsEvent: PropTypes.func,
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  };

  render () {
    const { t } = this.context
    const { onChange, value, useNativeCurrencyAsPrimaryCurrency } = this.props

    return (
      // <div>
      //   <FormControl component="fieldset" >
      //     <FormLabel component="legend" >Select HD Path</FormLabel>
      //     <FormHelperText id="name-helper-text">{`If you don't see your existing accounts, try switching paths to "Legacy"`}</FormHelperText>
      //     <RadioGroup
      //       row
      //       name="chain"
      //       value={value}
      //       onChange={onChange}
      //     >
      //       <FormControlLabel value="WAN" control={<Radio color="primary"/>} label="Live" />
      //       <FormControlLabel value="ETH" control={<Radio color="primary"/>} label="Legacy" />
      //     </RadioGroup>
      //   </FormControl>
      // </div>
      <div className="settings-page__content-item-col">
        <div className="settings-tab__radio-buttons">
          <div className="settings-tab__radio-button">
            <input
              type="radio"
              id="native-primary-currency"
              onChange={onChange}
              checked={Boolean(value === 'WAN')}
              value="WAN"
            />
            <label
              htmlFor="native-primary-currency"
              className="settings-tab__radio-label"
            >
              { `Live`}
            </label>
          </div>
          <div className="settings-tab__radio-button">
            <input
              type="radio"
              id="fiat-primary-currency"
              onChange={onChange}
              checked={value !== 'WAN'}
              value="ETH"
            />
            <label
              htmlFor="fiat-primary-currency"
              className="settings-tab__radio-label"
            >
              { 'Legacy' }
            </label>
          </div>
        </div>
      </div>
    )
  }
}

RadioButtons.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  useNativeCurrencyAsPrimaryCurrency: PropTypes.bool,
}

export default RadioButtons
