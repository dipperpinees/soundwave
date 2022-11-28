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
            description: "Đăng kí, đăng nhập, xác thực tài khoản",  
        }
    ],
    schemes: [window.location.protocol.replace(":", "")], 
    paths: {
        "/signup": {   
            post: {       
                tags: ["auth"],
                summary: "Tạo tài khoản",
                operationId: "CreateUser",
                consumes: ["application/json"],    
                produces: ["application/json"],     
                parameters: [              
                    {
                        "in": "body",      
                        "name": "Thông tin tài khoản",  
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
                summary: "Đăng nhập tài khoản",
                operationId: "Login",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",      
                        "name": "Thông tin tài khoản",  
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
                summary: "Xác thực token",
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
                summary: "Đăng xuất",
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
                summary: "Quên mật khẩu",
                operationId: "ForgotPassword",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        "in": "body",      
                        "name": "Thông tin quên mật khẩu",  
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
                summary: "Đổi mật khẩu",
                operationId: "ResetPassword",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        "in": "body",      
                        "name": "Thông tin reset mật khẩu",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userID": {
                                    "type": "string"
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
                summary: "Upload nhạc",
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
                summary: "Lấy list bài nhạc",
                operationId: "GetListSongs",
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
                summary: "Lấy bài nhạc theo id",
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
                summary: "Xoá bài nhạc",
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
                summary: "Update bài nhạc",
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
                summary: "Like bài nhạc",
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
                summary: "Unlike bài nhạc",
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
                summary: "Lấy comments bài nhạc",
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
                summary: "Comment bài nhạc",
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
                summary: "Cập nhật comment",
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
                summary: "Xoá comment",
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
                summary: "Tăng số lượt nghe bài hát",
                operationId: "IncrementPlayCount",
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
                summary: "Báo cáo bài hát",
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
                        "name": "Thông tin report",  
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
                summary: "Lấy danh sách user",
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
                summary: "Cập nhật thông tin user",
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
                summary: "Lấy thông tin user",
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
                summary: "Lấy bài hát yêu thích của user",
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
                tags: ["user"],
                summary: "Lấy các bài nhạc user đã đăng tải",
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
        "/user/follow/{followingID}": {
            post: {
                tags: ["user"],
                summary: "Follow user khác",
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
                summary: "Unfollow user khác",
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
                summary: "Lấy danh sách người theo dõi",
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
                summary: "Lấy danh sách người đang theo dõi",
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
                summary: "Lấy list genre",
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
                summary: "Tạo playlist",
                operationId: "CreatePlaylist",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [              
                    {
                        "in": "body",      
                        "name": "Thông tin playlist",  
                        "required": "true",   
                        "schema": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "songs": {
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
            get: {
                tags: ["playlist"],
                summary: "Lấy thông tin playlist",
                operationId: "GetPlaylist",
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
                summary: "Thêm bài hát vào playlist",
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
    }
};