CREATE DATABASE heyyou;
--users table
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_phone VARCHAR(15) NOT NULL,
    -- 11-digit format including country code
    user_day VARCHAR(10) NOT NULL,
    --Monday, Tuesday, Wednesday, ... Sunday
    user_time TIME NOT NULL,
    -- 24 hr format (ex: 12:00)
    user_week VARCHAR(10) NOT NULL,
    --first/second/third/last
    user_name VARCHAR(255),
    -- potential entry
    user_friend_name VARCHAR(255),
    -- potential entry
    PRIMARY KEY (user_id)
);
--calls table
CREATE TABLE calls(
    user_id UUID,
    total_calls INTEGER DEFAULT 0 NOT NULL,
    consecutive_calls INTEGER DEFAULT 0 NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);