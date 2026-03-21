import { ExternalLink } from 'react-feather'

type Props = {
    hasUnsavedChanges: boolean
    isSaving: boolean
    onSave: () => void
}

export default function SaveBar({ hasUnsavedChanges, isSaving, onSave }: Props) {
    return (
        <div className="py-4 px-5 sm:py-6 sm:px-8">
            <p className="text-[11px] text-fg-muted text-center mb-2.5">
                {hasUnsavedChanges ? (
                    'Unsaved changes'
                ) : (
                    <>
                        Tap a card to toggle · use{' '}
                        <span className="inline-flex align-middle">
                            <ExternalLink size={11} />
                        </span>{' '}
                        to open variant page
                    </>
                )}
            </p>
            <button
                onClick={onSave}
                disabled={!hasUnsavedChanges || isSaving}
                className="w-full h-[44px] bg-brand text-white font-medium text-[15px] rounded-xl disabled:opacity-40 disabled:cursor-default"
            >
                {isSaving ? 'Saving…' : 'Save changes'}
            </button>
        </div>
    )
}
