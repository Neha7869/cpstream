package com.cpstream.backend.stream;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class StreamResponse {

    private String id;

    private String name;

    private String thumbnailUrl;

    @JsonProperty("isLive")
    private boolean isLive;

    @JsonProperty("isChatEnabled")
    private boolean isChatEnabled;

    @JsonProperty("isChatDelayed")
    private boolean isChatDelayed;

    @JsonProperty("isChatFollowersOnly")
    private boolean isChatFollowersOnly;

    private String platform;

    private String difficulty;

    private String language;

    private String username;

    private String userImageUrl;

    private LocalDateTime updatedAt;
}