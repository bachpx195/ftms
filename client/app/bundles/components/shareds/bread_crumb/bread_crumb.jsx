import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Breadcrumb extends React.Component {
  static propTypes = {
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    separatorChar: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
  };

  static defaultProps = {
    separatorChar: '/',
    classes: {},
    onClick: () => {},
  }

  constructor(props) {
    super(props);
    this._bindFunctions();
    this.state = {
      pathConfiguration: this._buildPath(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pathConfiguration: this._buildPath(nextProps),
    });
  }

  _bindFunctions() {
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(path) {
    return (e) => {
      this.props.onClick(e, path);
    };
  }

  _buildPath(props) {
    if (typeof props.path === 'string') {
      return this._buildPathForString(props);
    }
    return this._buildPathForArray(props);
  }

  _buildPathForString(props) {
    const pathConfiguration = {
      separatorChar: props.separatorChar,
      breadcrumbPath: [],
    };

    const pathSections = props.path.split('/');
    let accumulatePath = '';
    for (const path of pathSections) {
      if (path && path !== '') {
        accumulatePath += `/${path}`;
        pathConfiguration.breadcrumbPath.push({
          label: path,
          path: accumulatePath,
        });
      }
    }
    return pathConfiguration;
  }

  _buildPathForArray(props) {
    return {
      separatorChar: props.separatorChar,
      breadcrumbPath: props.path,
    };
  }

  _getPathComponents() {
    const { pathConfiguration } = this.state;
    return pathConfiguration.breadcrumbPath.map(
      (path, index) => {
        return this._getPathComponent(path, pathConfiguration.separatorChar,
          index, pathConfiguration.breadcrumbPath.length)
      }
    );
  }

  _getPathComponent(pathObj, separatorChar, index, max) {
    const { classes } = this.props;
    const classNameContainer = classNames(
      'Breadcrumb-container',
      {
        [classes['Breadcrumb-container']]: !!classes['Breadcrumb-container'],
      }
    );
    const classNameSeparator = classNames(
      'Breadcrumb-separator',
      {
        [classes['Breadcrumb-separator']]: !!classes['Breadcrumb-separator'],
      }
    );

    const classNamePath = classNames(
      'Breadcrumb-path',
      {
        [classes['Breadcrumb-path']]: !!classes['Breadcrumb-path'],
      }
    );

    if (index == max - 1 && this.props.others.length > 0) {
      let url = pathObj.path.substr(0, pathObj.path.length - 2);
      return(
        <div className={classNameContainer} key={index}>
          <span className={classNameSeparator}>
            {separatorChar}
          </span>
          <div className="dropdown Breadcrumb-container-dropdown">
            <a className="dropdown-toggle text-danger"
              type="button" data-toggle="dropdown">{pathObj.label}
            <span className="caret"></span></a>
            <ul className="dropdown-menu">
              {this._render_other_object_dropdown(url)}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <span
          className={classNameContainer}
          key={index}
        >
          {
            index > 0 &&
            <span className={classNameSeparator}>
              {separatorChar}
            </span>
          }
          <span
            onClick={this.handleClick(pathObj)}
            className={classNamePath}
          >
            {this._getLinkPath(pathObj)}
          </span>
        </span>
      );
    }

  }

  _render_other_object_dropdown(url) {
    return this.props.others.map(other => {
      return (
        <li key={"other" + other.id}><a href={url + '/' + other.id}>{other.name}</a></li>
      );
    });
  }

  _getLinkPath(pathObj) {
    if (pathObj.path && pathObj.path !== '') {
      return (
        <a href={pathObj.path}>
          {pathObj.label}
        </a>
      );
    }
    return pathObj.label;
  }

  render() {
    const { className } = this.props;
    const classNameParent = classNames(
      'Breadcrumb',
      {
        [className]: !!className,
      }
    );
    return (
      <div className={classNameParent}>
        {this._getPathComponents()}
      </div>
    );
  }
}
