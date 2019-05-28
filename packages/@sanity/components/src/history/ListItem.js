import PropTypes from 'prop-types'
import React from 'react'
import {Tooltip} from 'react-tippy'
import PresenceCircle from '../presence/PresenceCircle'
import PresenceList from '../presence/PresenceList'
import colorHasher from '../presence/colorHasher'

import styles from './styles/ListItem.modules.css'

const MAX_USERS = 3

export default class DefaultLabel extends React.PureComponent {
  static propTypes = {
    status: PropTypes.oneOf(['published', 'edited', 'created', 'unpublished']),
    title: PropTypes.string,
    children: PropTypes.node,
    isSelected: PropTypes.bool,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        imageUrl: PropTypes.string
      })
    )
  }

  static defaultProps = {
    status: 'unknown',
    title: 'Untitled',
    users: [],
    children: undefined
  }

  render() {
    const {status, isSelected, title, users, children} = this.props
    return (
      <div className={isSelected ? styles.selected : styles.unSelected} data-status={status}>
        <div className={styles.startLine} aria-hidden="true" />
        <div className={styles.endLine} aria-hidden="true" />
        <div className={styles.status}>{status}</div>
        <div className={styles.title}>{title}</div>
        {users && users.length > 0 && (
          <div className={styles.users}>
            {users.slice(0, MAX_USERS).map(user => (
              <div className={styles.user} key={user.identity}>
                <PresenceCircle
                  title={users.length === 1 ? false : user.displayName}
                  imageUrl={user.imageUrl}
                  color={colorHasher(user.identity)}
                />
              </div>
            ))}
            {users.length === 1 && <div className={styles.userName}>{users[0].displayName}</div>}
            {users.length > 1 && (
              <div className={styles.extraItems}>
                <Tooltip
                  html={
                    <PresenceList
                      markers={users.map(user => ({
                        type: 'presence',
                        identity: user.identity,
                        user: {...user}
                      }))}
                    />
                  }
                  interactive
                  position="top"
                  trigger="mouseenter"
                  animation="scale"
                  arrow
                  theme="light"
                  distance="10"
                  duration={50}
                >
                  <div className={styles.userName}>{users.length} people</div>
                </Tooltip>
              </div>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    )
  }
}