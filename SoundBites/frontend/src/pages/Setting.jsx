import React from "react";

export default function Setting() {
	return (
		<main className="flex-1 px-8 py-8 pb-32">
			<div className="max-w-4xl">				
				{/* Audio Quality Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Audio Quality</h3>
						<p className="text-sm text-gray-400 mt-1">Configure your streaming and download quality</p>
					</div>
					<div className="space-y-4">
						{/* Streaming Quality */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Streaming Quality</p>
								<p className="text-sm text-gray-400 mt-0.5">Quality of music while streaming</p>
							</div>
							<div className="ml-4">
								<button type="button" className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none w-48 bg-white/10 border-gray-700">
									<span>High (320 kbps)</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 opacity-50"><path d="m6 9 6 6 6-6"></path></svg>
								</button>
							</div>
						</div>
						{/* Download Quality */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Download Quality</p>
								<p className="text-sm text-gray-400 mt-0.5">Quality of downloaded music</p>
							</div>
							<div className="ml-4">
								<button type="button" className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none w-48 bg-white/10 border-gray-700">
									<span>High (320 kbps)</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 opacity-50"><path d="m6 9 6 6 6-6"></path></svg>
								</button>
							</div>
						</div>
						{/* Normalize Volume */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Normalize Volume</p>
								<p className="text-sm text-gray-400 mt-0.5">Set the same volume level for all songs</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Divider */}
				<div className="shrink-0 h-px w-full my-8 bg-gray-800"></div>
				{/* Playback Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Playback</h3>
						<p className="text-sm text-gray-400 mt-1">Control how your music plays</p>
					</div>
					<div className="space-y-4">
						{/* Crossfade Songs */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Crossfade Songs</p>
								<p className="text-sm text-gray-400 mt-0.5">Fade between songs</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="false" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-switch-background">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-0"></span>
								</button>
							</div>
						</div>
						{/* Crossfade Duration */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Crossfade Duration</p>
								<p className="text-sm text-gray-400 mt-0.5">Length of crossfade in seconds</p>
							</div>
							<div className="ml-4">
								<div className="w-48 flex items-center gap-4">
									<span className="relative flex w-full touch-none items-center select-none flex-1">
										<span className="bg-muted relative grow overflow-hidden rounded-full h-4 w-full">
											<span className="bg-primary absolute h-full" style={{ left: 0, right: '58.3333%' }}></span>
										</span>
										<span style={{ position: 'absolute', left: '41.6667%' }}>
											<span role="slider" aria-valuemin={0} aria-valuemax={12} aria-orientation="horizontal" tabIndex={0} className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden" aria-valuenow={5}></span>
										</span>
									</span>
									<span className="text-sm text-gray-400 w-8">5s</span>
								</div>
							</div>
						</div>
						{/* Gapless Playback */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Gapless Playback</p>
								<p className="text-sm text-gray-400 mt-0.5">Play songs without pause</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
						{/* Autoplay */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Autoplay</p>
								<p className="text-sm text-gray-400 mt-0.5">Play similar songs when your music ends</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Divider */}
				<div className="shrink-0 h-px w-full my-8 bg-gray-800"></div>
				{/* Notifications Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Notifications</h3>
						<p className="text-sm text-gray-400 mt-1">Manage what notifications you receive</p>
					</div>
					<div className="space-y-4">
						{/* New Releases */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>New Releases</p>
								<p className="text-sm text-gray-400 mt-0.5">Get notified about new music from artists you follow</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
						{/* Playlist Updates */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Playlist Updates</p>
								<p className="text-sm text-gray-400 mt-0.5">Notifications when collaborative playlists are updated</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
						{/* Recommendations */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Recommendations</p>
								<p className="text-sm text-gray-400 mt-0.5">Weekly personalized music recommendations</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="false" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-switch-background">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-0"></span>
								</button>
							</div>
						</div>
						{/* Email Newsletter */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Email Newsletter</p>
								<p className="text-sm text-gray-400 mt-0.5">Receive our monthly newsletter</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="false" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-switch-background">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-0"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Divider */}
				<div className="shrink-0 h-px w-full my-8 bg-gray-800"></div>
				{/* Privacy Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Privacy</h3>
						<p className="text-sm text-gray-400 mt-1">Control your privacy and data</p>
					</div>
					<div className="space-y-4">
						{/* Private Session */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Private Session</p>
								<p className="text-sm text-gray-400 mt-0.5">Listen without saving to your history</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="false" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-switch-background">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-0"></span>
								</button>
							</div>
						</div>
						{/* Public Profile */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Public Profile</p>
								<p className="text-sm text-gray-400 mt-0.5">Make your profile visible to others</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
						{/* Show Recently Played */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Show Recently Played</p>
								<p className="text-sm text-gray-400 mt-0.5">Display recently played songs on your profile</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="true" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-primary">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-[calc(100%-2px)]"></span>
								</button>
							</div>
						</div>
						{/* Activity Sharing */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Activity Sharing</p>
								<p className="text-sm text-gray-400 mt-0.5">Share what you're listening to with followers</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="false" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-switch-background">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-0"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Divider */}
				<div className="shrink-0 h-px w-full my-8 bg-gray-800"></div>
				{/* Language & Region Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Language &amp; Region</h3>
						<p className="text-sm text-gray-400 mt-1">Customize your language and location preferences</p>
					</div>
					<div className="space-y-4">
						{/* Language */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Language</p>
								<p className="text-sm text-gray-400 mt-0.5">Choose your preferred language</p>
							</div>
							<div className="ml-4">
								<button type="button" className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none w-48 bg-white/10 border-gray-700">
									<span>English</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 opacity-50"><path d="m6 9 6 6 6-6"></path></svg>
								</button>
							</div>
						</div>
						{/* Country/Region */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Country/Region</p>
								<p className="text-sm text-gray-400 mt-0.5">Your current location</p>
							</div>
							<div className="ml-4">
								<button type="button" className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none w-48 bg-white/10 border-gray-700">
									<span>United States</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 opacity-50"><path d="m6 9 6 6 6-6"></path></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Divider */}
				<div className="shrink-0 h-px w-full my-8 bg-gray-800"></div>
				{/* Data & Storage Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Data &amp; Storage</h3>
						<p className="text-sm text-gray-400 mt-1">Manage your data usage and storage</p>
					</div>
					<div className="space-y-4">
						{/* Data Saver */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Data Saver</p>
								<p className="text-sm text-gray-400 mt-0.5">Use less data when streaming</p>
							</div>
							<div className="ml-4">
								<button type="button" role="switch" aria-checked="false" className="peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 bg-switch-background">
									<span className="bg-card pointer-events-none block size-4 rounded-full ring-0 transition-transform translate-x-0"></span>
								</button>
							</div>
						</div>
						{/* Storage Location */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Storage Location</p>
								<p className="text-sm text-gray-400 mt-0.5">Where downloaded music is saved</p>
							</div>
							<div className="ml-4">
								<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border text-foreground hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 bg-transparent border-gray-700 hover:bg-white/10">Change Location</button>
							</div>
						</div>
						{/* Clear Cache */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Clear Cache</p>
								<p className="text-sm text-gray-400 mt-0.5">Free up space by clearing cached data</p>
							</div>
							<div className="ml-4">
								<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border text-foreground hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 bg-transparent border-gray-700 hover:bg-white/10">Clear Cache</button>
							</div>
						</div>
					</div>
				</div>
				{/* Divider */}
				<div className="shrink-0 h-px w-full my-8 bg-gray-800"></div>
				{/* Account Management Section */}
				<div className="mb-8">
					<div className="mb-4">
						<h3>Account Management</h3>
						<p className="text-sm text-gray-400 mt-1">Manage your account status</p>
					</div>
					<div className="space-y-4">
						{/* Sign Out */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Sign Out</p>
								<p className="text-sm text-gray-400 mt-0.5">Sign out of your account on this device</p>
							</div>
							<div className="ml-4">
								<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border text-foreground hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 bg-transparent border-gray-700 hover:bg-white/10">Sign Out</button>
							</div>
						</div>
						{/* Delete Account */}
						<div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
							<div className="flex-1">
								<p>Delete Account</p>
								<p className="text-sm text-gray-400 mt-0.5">Permanently delete your account and all data</p>
							</div>
							<div className="ml-4">
								<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 h-9 px-4 py-2 has-[>svg]:px-3 bg-red-600/20 border-red-600/50 text-red-400 hover:bg-red-600/30">Delete Account</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
