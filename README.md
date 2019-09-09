#  [![Conduit](https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_blur_circular_black_24px.svg)](#) Conduit - 0x Relayer API

[![Build Status](https://travis-ci.org/amisolution/conduit.svg?branch=master)](https://travis-ci.org/amisolution/conduit)
[![CircleCI](https://circleci.com/gh/amisolution/conduit.svg?style=svg)](https://circleci.com/gh/amisolution/conduit/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Overview

[Work in progress, PR/Contributions welcome! Testing on Kovan test network]

ZeroEx Open Source Relayer using the [Open Orderbook](https://0xproject.com/wiki#Open-Orderbook) strategy.

Follows ZeroEx [Standard Relayer API V0 Draft](https://github.com/0xProject/standard-relayer-api) specification.

## Getting started

### Local dev setup

To start the local dev server: 

```
yarn install
yarn dev
```
The server is hosted at `http://localhost:3000`

To make sure it is working, make a GET request to `http://localhost:3000/api/v0/token_pairs` 


### Architecture
                                                                    
	                                                                     
	                                                                     
	                              ┌──────────────┐                       
	                              │              │                       
	                              │    Client    │                       
	                              │              │                       
	                              └──────────────┘                       
	                                    ▲  ▲                             
	                            ┌───────┘  └───────┐                     
	                            │                  ▼                     
	                     ┌─────────────┐    ┌─────────────┐              
	                     │             │    │             │              
	                     │  WebSocket  │    │  HTTP API   │              
	                     │             │    │             │              
	                     └─────────────┘    └─────────────┘              
	                            ▲                  ▲                     
	                            │ emits            │                     
	                            └─events┐   ┌──────┘                     
	                                    │   │                            
	                                    │   ▼                            
	    ┌──────────────────┐      ┌──────────────┐       ┌──────────────┐
	    │  Relevant event  │      │              │       │◦◦◦◦◦◦◦◦◦◦◦◦◦◦│
	    │     streams      │─────▶│  App Engine  │◀─────▶│◦◦◦◦0x.js◦◦◦◦◦│
	    │ (includes 0x.js) │      │              │       │◦◦◦◦◦◦◦◦◦◦◦◦◦◦│
	    └──────────────────┘      └──────────────┘       └──────────────┘
	                                      ▲                              
	                                      │                              
	                                      ▼                              
	                              ┌──────────────┐                       
	                              │              │                       
	                              │  Orderbook   │                       
	                              │              │                       
	                              └──────────────┘                       
	                                      ▲                              
	                                      │                              
	                                      ▼                              
	                              ┌──────────────┐                       
	                              │              │                       
	                              │  Data store  │                       
	                              │              │                       
	                              └──────────────┘                       
### Roadmap

I'll be adding support for [Matching](https://0xproject.com/wiki#Matching) as soon as [this proposal](https://github.com/0xProject/ZEIPs/issues/2) is implemented. I personally think the matching strategy will lead to a better UX (atomic, no race conditions, faster relay feedback), but currently requires large upfront capital. Matching engine will use sorted sets on top of red-black trees and will be configured as a separate strategy.
