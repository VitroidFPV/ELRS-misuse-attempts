import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin";

export const elrsTheme: CustomThemeConfig = {
	name: "elrs-theme",
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "16px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #a7e35f
		"--color-primary-50": "242 251 231", // #f2fbe7
		"--color-primary-100": "237 249 223", // #edf9df
		"--color-primary-200": "233 248 215", // #e9f8d7
		"--color-primary-300": "220 244 191", // #dcf4bf
		"--color-primary-400": "193 235 143", // #c1eb8f
		"--color-primary-500": "167 227 95", // #a7e35f
		"--color-primary-600": "150 204 86", // #96cc56
		"--color-primary-700": "125 170 71", // #7daa47
		"--color-primary-800": "100 136 57", // #648839
		"--color-primary-900": "82 111 47", // #526f2f
		// secondary | #5f8bf3
		"--color-secondary-50": "231 238 253", // #e7eefd
		"--color-secondary-100": "223 232 253", // #dfe8fd
		"--color-secondary-200": "215 226 252", // #d7e2fc
		"--color-secondary-300": "191 209 250", // #bfd1fa
		"--color-secondary-400": "143 174 247", // #8faef7
		"--color-secondary-500": "95 139 243", // #5f8bf3
		"--color-secondary-600": "86 125 219", // #567ddb
		"--color-secondary-700": "71 104 182", // #4768b6
		"--color-secondary-800": "57 83 146", // #395392
		"--color-secondary-900": "47 68 119", // #2f4477
		// tertiary | #26a699
		"--color-tertiary-50": "222 242 240", // #def2f0
		"--color-tertiary-100": "212 237 235", // #d4edeb
		"--color-tertiary-200": "201 233 230", // #c9e9e6
		"--color-tertiary-300": "168 219 214", // #a8dbd6
		"--color-tertiary-400": "103 193 184", // #67c1b8
		"--color-tertiary-500": "38 166 153", // #26a699
		"--color-tertiary-600": "34 149 138", // #22958a
		"--color-tertiary-700": "29 125 115", // #1d7d73
		"--color-tertiary-800": "23 100 92", // #17645c
		"--color-tertiary-900": "19 81 75", // #13514b
		// success | #84cc16
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #d21956
		"--color-error-50": "248 221 230", // #f8dde6
		"--color-error-100": "246 209 221", // #f6d1dd
		"--color-error-200": "244 198 213", // #f4c6d5
		"--color-error-300": "237 163 187", // #eda3bb
		"--color-error-400": "224 94 137", // #e05e89
		"--color-error-500": "210 25 86", // #d21956
		"--color-error-600": "189 23 77", // #bd174d
		"--color-error-700": "158 19 65", // #9e1341
		"--color-error-800": "126 15 52", // #7e0f34
		"--color-error-900": "103 12 42", // #670c2a
		// surface | #242424
		"--color-surface-50": "222 222 222", // #dedede
		"--color-surface-100": "211 211 211", // #d3d3d3
		"--color-surface-200": "200 200 200", // #c8c8c8
		"--color-surface-300": "167 167 167", // #a7a7a7
		"--color-surface-400": "102 102 102", // #666666
		"--color-surface-500": "36 36 36", // #242424
		"--color-surface-600": "32 32 32", // #202020
		"--color-surface-700": "27 27 27", // #1b1b1b
		"--color-surface-800": "22 22 22", // #161616
		"--color-surface-900": "18 18 18" // #121212
	}
};
