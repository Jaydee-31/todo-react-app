export default function XInputError({ message, className = "", ...props }) {
	return message ? (
		<p {...props} className={"text-sm text-red-600 dark:text-red-400 " + className}>
			{message}
		</p>
	) : null;
}
