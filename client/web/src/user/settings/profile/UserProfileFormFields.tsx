import React, { useCallback } from 'react'

import classNames from 'classnames'

import * as GQL from '@sourcegraph/shared/src/schema'
import { Input, Label } from '@sourcegraph/wildcard'

import { USER_DISPLAY_NAME_MAX_LENGTH } from '../..'
import { UsernameInput } from '../../../auth/SignInSignUpCommon'
import { UserAvatar } from '../../UserAvatar'

import styles from './UserProfileFormFields.module.scss'

export type UserProfileFormFieldsValue = Pick<GQL.IUser, 'username' | 'displayName' | 'avatarURL'>

interface Props {
    value: UserProfileFormFieldsValue
    onChange: (newValue: UserProfileFormFieldsValue) => void
    usernameFieldDisabled?: boolean
    disabled?: boolean
}

export const UserProfileFormFields: React.FunctionComponent<React.PropsWithChildren<Props>> = ({
    value,
    onChange,
    usernameFieldDisabled,
    disabled,
}) => {
    const onUsernameChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        event => onChange({ ...value, username: event.target.value }),
        [onChange, value]
    )
    const onDisplayNameChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        event => onChange({ ...value, displayName: event.target.value }),
        [onChange, value]
    )
    const onAvatarURLChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        event => onChange({ ...value, avatarURL: event.target.value }),
        [onChange, value]
    )

    return (
        <div data-testid="user-profile-form-fields">
            <div className="form-group">
                <Label htmlFor="UserProfileFormFields__username">Username</Label>
                <UsernameInput
                    id="UserProfileFormFields__username"
                    className="test-UserProfileFormFields-username"
                    value={value.username}
                    onChange={onUsernameChange}
                    required={true}
                    disabled={usernameFieldDisabled || disabled}
                    aria-describedby="UserProfileFormFields__username-help"
                />
                <small id="UserProfileFormFields__username-help" className="form-text text-muted">
                    A username consists of letters, numbers, hyphens (-), dots (.), underscore (_) and may not begin or end with a dot,
                    nor begin with a hyphen.
                </small>
            </div>
            <Input
                id="UserProfileFormFields__displayName"
                data-testid="test-UserProfileFormFields__displayName"
                value={value.displayName || ''}
                onChange={onDisplayNameChange}
                disabled={disabled}
                spellCheck={false}
                placeholder="Display name"
                maxLength={USER_DISPLAY_NAME_MAX_LENGTH}
                className="form-group"
                label="Display name"
            />

            <div className="d-flex align-items-center">
                <Input
                    id="UserProfileFormFields__avatarURL"
                    type="url"
                    value={value.avatarURL || ''}
                    onChange={onAvatarURLChange}
                    disabled={disabled}
                    spellCheck={false}
                    placeholder="URL to avatar photo"
                    className="form-group w-100"
                    label="Avatar URL"
                />
                {value.avatarURL && <UserAvatar user={value} className={classNames('ml-2', styles.avatar)} />}
            </div>
        </div>
    )
}
