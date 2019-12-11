import {omit} from 'lodash'
import {useDocumentOperation} from '@sanity/react-hooks'
import {createAction} from 'part:@sanity/base/util/document-action-utils'
import ContentCopyIcon from 'part:@sanity/base/content-copy-icon'

export const PublishAction = createAction(function PublishAction(docInfo) {
  if (docInfo.isLiveEditEnabled) {
    return null
  }

  const {publish} = useDocumentOperation(docInfo.id, docInfo.type)

  return {
    icon: ContentCopyIcon,
    disabled: !docInfo.draft,
    label: 'Publish',
    onHandle: () => {
      publish(doc => omit(doc, 'reviewers'))
    }
  }
})