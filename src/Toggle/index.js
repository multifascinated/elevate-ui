import React, { Component } from "react";
import withStyles from "../withStyles";
import classNames from "classnames";

class Toggle extends Component {
  static defaultProps = {
    tabIndex: "0",
    type: "text",
  };

  render() {
    const {
      classes,
      className,
      checkedIcon,
      label,
      tabIndex,
      uncheckedIcon,
      validation,
      theme,
      withPadding = true,
      ...rest
    } = this.props;

    return (
      <div className={classNames(classes.scaffold, className)}>
        <label
          className={classes.root}
          ref={(l) => {
            this.label = l;
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 32) {
              e.preventDefault();
              this.label.click();
            }
          }}
          tabIndex={rest.disabled ? null : tabIndex}
        >
          <input
            ref={(c) => {
              this.checkbox = c;
            }}
            {...rest}
            style={{ display: "none" }}
          />
          <span
            className={classNames(
              classes.toggle,
              withPadding && classes.withPadding
            )}
          >
            {rest.checked ? checkedIcon : uncheckedIcon}
          </span>
          {label && <span className={classes.label}>{label}</span>}
        </label>
        {validation ? (
          <div className={classes.validation}>{validation}</div>
        ) : null}
      </div>
    );
  }
}

const styles = (theme) => ({
  scaffold: {
    position: "relative",
    display: "flex",
  },
  root: {
    display: "inline-flex",
    alignItems: "center",
    "&:focus": {
      outline: `1px dotted ${theme.colors.gray400}`, // Modify default focus glow
    },
  },
  toggle: {
    position: "relative",
    display: "inline-block",
    width: "20px",
    height: "20px",
    flexShrink: "0",
    overflow: "hidden",
    fill: theme.colors.gray800,
  },
  withPadding: {
    width: "36px",
    height: "36px",
    padding: "8px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    paddingRight: "12px", // extra hitbox padding
  },
});

export default withStyles(styles, { name: "EuiToggle" })(Toggle);
