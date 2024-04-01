import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'dist/index.mjs',
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [typescript()],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/index.d.ts',
			format: 'esm',
		},
		plugins: [dts()],
	},
];
