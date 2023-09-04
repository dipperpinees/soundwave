var spec =
{
    swagger: "2.0",   
    info: {
        description:
            "API docs music player",
        version: "1.0", 
        title: "API DOCS"
    },
    host: window.location.host,  
    basePath: "/api",     
    tags: [ 
        {
            name: "auth",                                
            description: "Sign in, Sign up, Authentication",  
        }
    ],
    schemes: [window.location.protocol.replace(":", "")], 
    paths: {
        "/signup": {   
            post: {       
                tags: ["auth"],
                summary: "Create account",
                operationId: "CreateUser",
                consumes: ["application/json"],    
                produces: ["application/json"],     
                parameters: [              
                    {
                        "in": "body",      
                        "name": "Account infomation",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                }
                            }
                        },
                    }
                ],
                responses: {
                    200: {
                        description: "OK"
                    },
                }
            }
        },
        "/signin": {
            post: {
                tags: ["auth"],
                summary: "Sign in",
                operationId: "Sign in",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",      
                        "name": "Account infomation",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            }
                        },
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
        },
        "/auth": {
            post: {
                tags: ["auth"],
                summary: "Token authentication",
                operationId: "Authenication",
                produces: ["application/json"],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
        },
        "/logout": {
            post: {
                tags: ["auth"],
                summary: "Log out",
                operationId: "LogOut",
                produces: ["application/json"],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
        },
        "/password/forget": {
            post: {
                tags: ["auth"],
                summary: "Forgot password",
                operationId: "ForgotPassword",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        "in": "body",      
                        "name": "Account infomation",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                }
                            }
                        },
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
        },
        "/password/reset": {
            post: {
                tags: ["auth"],
                summary: "Reset password",
                operationId: "ResetPassword",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        "in": "body",      
                        "name": "Account infomation",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userID": {
                                    "type": "number"
                                },
                                "newPassword": {
                                    "type": "string"
                                },
                                "code": {
                                    "type": "string"
                                }
                            }
                        },
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
        },
        "/song": {
            post: {
                tags: ["song"],
                summary: "Upload song",
                operationId: "CreateSong",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "formData",
                        name: "file",
                        type: "file",
                        description: "The music file to upload.",
                        required: true
                    },
                    {
                        in: "formData",
                        name: "title",
                        type: "string",
                        required: true
                    },
                    {
                        in: "formData",
                        name: "thumbnail",
                        type: "file",
                    },
                    {
                        in: "formData",
                        name: "genreID",
                        type: "int",
                        required: true
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            get: {
                tags: ["song"],
                summary: "Get list of songs",
                operationId: "GetListOfSongs",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "query",
                        name: "page",
                        type: "interger"
                    },
                    {
                        in: "query",
                        name: "search",
                        type: "string"
                    },
                    {
                        in: "query",
                        name: "orderBy",
                        type: "string"
                    },
                    {
                        in: "query",
                        name: "limit",
                        type: "interger"
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
        },
        "/song/{songID}": {
            get: {
                tags: ["song"],
                summary: "Get song by id",
                operationId: "GetSongByID",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            delete: {
                tags: ["song"],
                summary: "Delete song",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            put: {
                tags: ["song"],
                summary: "Update song",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    },
                    {
                        in: "formData",
                        name: "file",
                        type: "file",
                        description: "The music file to upload."
                    },
                    {
                        in: "formData",
                        name: "title",
                        type: "string"
                    },
                    {
                        in: "formData",
                        name: "thumbnail",
                        type: "file"
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/song/like/{songID}": {
            post: {
                tags: ["song"],
                summary: "Like song",
                operationId: "CreateFavoriteSong",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            delete: {
                tags: ["song"],
                summary: "Unlike song",
                operationId: "DeleteFavoriteSong",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/song/{songID}/comment": {
            get: {
                tags: ["comment"],
                summary: "Get comments of song",
                operationId: "GetCommentBySongID",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            post: {
                tags: ["comment"],
                summary: "Create comment of song",
                operationId: "CreateComment",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        schema: {
                            type: "interger"
                        }  
                    },
                    {
                        in: "body",
                        name: "content",
                        required: true,   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "content": {
                                    "type": "string"
                                }
                            }
                        }, 
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/song/comment/{commentID}": {
            put: {
                tags: ["comment"],
                summary: "Update comment",
                operationId: "UpdateComment",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "commentID",
                        schema: {
                            type: "interger"
                        }  
                    },
                    {
                        in: "body",
                        name: "content",
                        required: true,   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "content": {
                                    "type": "string"
                                }
                            }
                        }, 
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            delete: {
                tags: ["comment"],
                summary: "Delete comment",
                operationId: "DeleteCommentBySongID",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "commentID",
                        schema: {
                            type: "interger"
                        }  
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/song/play/{songID}": {
            post: {
                tags: ["song"],
                summary: "Increase song listeners",
                operationId: "IncrementPlayListeners",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/song/{songID}/report": {
            post: {
                tags: ["song"],
                summary: "Report song",
                operationId: "ReportSong",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "songID",
                        type: "int",
                    },
                    {
                        "in": "body",      
                        "name": "Report infomation",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "reason": {
                                    "type": "string"
                                }
                            }
                        },
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/": {
            get: {
                tags: ["user"],
                summary: "Get list of users",
                operationId: "GetUserList",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "query",
                        name: "page",
                        type: "interger"
                    },
                    {
                        in: "query",
                        name: "search",
                        type: "string"
                    },
                    {
                        in: "query",
                        name: "limit",
                        type: "interger"
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            put: {
                tags: ["user"],
                summary: "Update user infomation",
                operationId: "UpdateUser",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "formData",
                        name: "avatar",
                        type: "file",
                        description: "Image file to upload.",
                    },
                    {
                        in: "formData",
                        name: "name",
                        type: "string",
                    },
                    {
                        in: "formData",
                        name: "description",
                        type: "string",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/{userID}": {
            get: {
                tags: ["user"],
                summary: "Get user infomation",
                operationId: "GetUserByID",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/favorite": {
            get: {
                tags: ["user"],
                summary: "Get list of favorite songs",
                operationId: "GetFavoriteSongs",
                produces: ["application/json"],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/{userID}/songs": {
            get: {
                tags: ["user", "song"],
                summary: "Get list of uploaded songs",
                operationId: "GetSongOfUser",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/{userID}/playlists": {
            get: {
                tags: ["user", "playlist"],
                summary: "Get playlists of user",
                operationId: "GetPlaylistsOfUser",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/follow/{followingID}": {
            post: {
                tags: ["user"],
                summary: "Follow user",
                operationId: "Follow",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "followingID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/unfollow/{followingID}": {
            post: {
                tags: ["user"],
                summary: "Unfollow user",
                operationId: "Unfollow",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "followingID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/follower/{userID}": {
            get: {
                tags: ["user"],
                summary: "Get followers",
                operationId: "GetFollowers",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/user/following/{userID}": {
            get: {
                tags: ["user"],
                summary: "Get followings",
                operationId: "GetFollowings",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/genre": {
            get: {
                tags: ["genre"],
                summary: "Get list of genres",
                operationId: "GetGenres",
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/playlist/": {
            post: {
                tags: ["playlist"],
                summary: "Create playlist",
                operationId: "CreatePlaylist",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        in: "formData",
                        name: "thumbnail",
                        type: "file",
                        required: true
                    },
                    {
                        in: "formData",
                        name: "name",
                        type: "string",
                        required: true
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            get: {
                tags: ["playlist"],
                summary: "Get list of playlists",
                operationId: "GetPlaylists",
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/playlist/{playlistID}": {
            get: {
                tags: ["playlist"],
                summary: "Get playlist by id",
                operationId: "GetPlaylistByID",
                produces: ["application/json"],
                parameters: [
                    {
                        in: "path",
                        name: "playlistID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/playlist/{playlistID}/song/": {
            post: {
                tags: ["playlist"],
                summary: "Add song to playlist",
                operationId: "CreatePlaylist",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [              
                    {
                        "in": "body",      
                        "name": "Song ID",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "songID": {
                                    "type": "string"
                                }
                            }
                        },
                    },
                    {
                        in: "path",
                        name: "playlistID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        },
        "/admin/ban/{userID}": {
            post: {
                tags: ["admin"],
                summary: "Ban user",
                operationId: "BanUser",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [              
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            },
            delete: {
                tags: ["admin"],
                summary: "Unban user",
                operationId: "UnnanUser",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [              
                    {
                        in: "path",
                        name: "userID",
                        type: "int",
                    }
                ],
                responses: {
                    200: {                                    
                        description: "OK",   
                    },
                }
            }
        }
    }
};